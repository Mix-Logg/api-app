import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadBucketService } from './upload-bucket.service';
import { CreatePhysicalDto } from './dto/create-physical.dto'
import { FileInterceptor } from '@nestjs/platform-express';
import * as AWS from 'aws-sdk';

@Controller('upload-bucket')
export class UploadBucketController {
  constructor(
    private readonly uploadBucketService: UploadBucketService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() CreatePhysicalDto : CreatePhysicalDto) {
    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
    const bucket = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_SECRET_KEY
    });
    const bucketName = process.env.BUCKET_NAME;
    if(CreatePhysicalDto.function === 'physical' && CreatePhysicalDto.am === 'driver' ){
      const driverPhysical = {
        Bucket: bucketName,
        Key: `driver/${CreatePhysicalDto.id}/${file.originalname}`,
        Body: file.buffer, 
        ContentType: file.mimetype,
      };
      try {
        await bucket.upload(driverPhysical).promise();
        return {'msg':'success'}
      } catch (error) {
        console.error('Erro ao enviar arquivo para o Ocean:', error);
      }
    }
    if(CreatePhysicalDto.function === 'vehicle' && CreatePhysicalDto.am === 'driver' ){
      const driverPhysical = {
        Bucket: bucketName,
        Key: `driver/${CreatePhysicalDto.id}/vehicle/${file.originalname}`,
        Body: file.buffer, 
        ContentType: file.mimetype,
      };
      try {
        await bucket.upload(driverPhysical).promise();
        return {'msg':'success'}
      } catch (error) {
        console.error('Erro ao enviar arquivo para o Ocean:', error);
      }
    }
    if(CreatePhysicalDto.function === 'physical' && CreatePhysicalDto.am === 'auxiliary' ){
      const auxiliaryPhysical = {
        Bucket: bucketName,
        Key: `auxiliary/${CreatePhysicalDto.id}/${file.originalname}`,
        Body: file.buffer, 
        ContentType: file.mimetype,
      };
      try {
        await bucket.upload(auxiliaryPhysical).promise();
        return {'msg':'success'}
      } catch (error) {
        console.error('Erro ao enviar arquivo para o Ocean:', error);
      }
    }
  }

  @Get(':id/:am/:file')
  async getFile(
      @Param('id') id: string,
      @Param('am') am: string,
      @Param('file') file: string
    ){
    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
    const bucket = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_SECRET_KEY
    });
    const bucketName = process.env.BUCKET_NAME;
    
    const paramsFile = {
      Bucket: bucketName,
      Key: am+'/'+id+'/'+file
    };
    const paramsPaste = {
      Bucket: bucketName,
      Prefix : am+'/'+id+'/',
    };
    const getPathFile = (): Promise<string> => {
      return new Promise((resolve, reject) => {
        bucket.listObjectsV2(paramsPaste, (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            const objetos = data.Contents;
            const arquivo = objetos.find(obj => obj.Key.includes(file));
            if (arquivo) {
              resolve(arquivo.Key);
            } else {
              resolve('false');
            }
          }
        });
      });
    };
    const getFile = (params): Promise<Object> => {
      return new Promise(async (resolve, reject) => {
        const dataImage = {
          file:file,
          type:'',
          buffer:null
        }
        const data = await bucket.getObject(params).promise()
        dataImage.type = data.ContentType
        if(dataImage.type.includes('pdf')){
          dataImage.buffer = data.Body.toString('base64')
        }else{
          dataImage.buffer = data.Body.toString('base64')
        }
        resolve(dataImage)
      })
    }
    
    try {
      const imageData = await getPathFile();
      paramsFile.Key = imageData;
      const dataImg = await getFile(paramsFile)
      // console.log(dataImg)
      return dataImg
    } catch (err) {
      
      console.error('Erro ao buscar imagem:', err);
    }
  }

  @Get(':id/:am/')
  async verifyPaste(
      @Param('id') id: string,
      @Param('am') am: string,
    ){

    const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
    const bucket = new AWS.S3({
      endpoint: spacesEndpoint,
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.BUCKET_SECRET_KEY
    });

    const bucketName = process.env.BUCKET_NAME;
    
    const paramsPaste = {
      Bucket: bucketName,
      Prefix : `${am}/${id}/`
    };

    const getPathFile = (): Promise<any[]> => {
      return new Promise((resolve, reject) => {
        bucket.listObjectsV2(paramsPaste, (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            resolve(data.Contents); // Resolvendo a Promise com os dados obtidos
          }
        });
      });
    };
    
    try {
      let res = await getPathFile();
      return res;
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      throw error;
    }
  }
  
}


