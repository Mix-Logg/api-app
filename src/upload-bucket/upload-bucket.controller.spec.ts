import { Test, TestingModule } from '@nestjs/testing';
import { UploadBucketController } from './upload-bucket.controller';
import { UploadBucketService } from './upload-bucket.service';

describe('UploadBucketController', () => {
  let controller: UploadBucketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadBucketController],
      providers: [UploadBucketService],
    }).compile();

    controller = module.get<UploadBucketController>(UploadBucketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
