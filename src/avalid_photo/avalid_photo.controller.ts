import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AvalidPhotoService } from './avalid_photo.service';
import { CreateAvalidPhotoDto } from './dto/create-avalid_photo.dto';
import { UpdateAvalidPhotoDto } from './dto/update-avalid_photo.dto';

@Controller('avalid-photo')
export class AvalidPhotoController {
  constructor(private readonly avalidPhotoService: AvalidPhotoService) {}

  @Post()
  create(@Body() createAvalidPhotoDto: CreateAvalidPhotoDto) {
    return this.avalidPhotoService.create(createAvalidPhotoDto);
  }

  @Get()
  findAll() {
    return this.avalidPhotoService.findAll();
  }

  @Get(':id/:am')
  findOne(
    @Param('id') id: number,
    @Param('am') am: string,
    ) {
    return this.avalidPhotoService.findOne(id, am);
  }

  @Patch()
  update(@Body() updateAvalidPhotoDto: UpdateAvalidPhotoDto) {
    return this.avalidPhotoService.update(updateAvalidPhotoDto);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avalidPhotoService.remove(+id);
  }
}
