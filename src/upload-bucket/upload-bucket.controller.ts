import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
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
      accessKeyId: 'DO0036EUWG2DKLNMYVT6',
      secretAccessKey: 'TWXtI00AUnHVkgpZuYAjEYyKiWkv/mMH1KAvUIN5qeY'
    });
    const bucketName = 'miximg';
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
  }
}
