import { Test, TestingModule } from '@nestjs/testing';
import { AvalidPhotoService } from './avalid_photo.service';

describe('AvalidPhotoService', () => {
  let service: AvalidPhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AvalidPhotoService],
    }).compile();

    service = module.get<AvalidPhotoService>(AvalidPhotoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
