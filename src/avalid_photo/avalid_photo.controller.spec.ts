import { Test, TestingModule } from '@nestjs/testing';
import { AvalidPhotoController } from './avalid_photo.controller';
import { AvalidPhotoService } from './avalid_photo.service';

describe('AvalidPhotoController', () => {
  let controller: AvalidPhotoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvalidPhotoController],
      providers: [AvalidPhotoService],
    }).compile();

    controller = module.get<AvalidPhotoController>(AvalidPhotoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
