import { Test, TestingModule } from '@nestjs/testing';
import { UploadBucketService } from './upload-bucket.service';

describe('UploadBucketService', () => {
  let service: UploadBucketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadBucketService],
    }).compile();

    service = module.get<UploadBucketService>(UploadBucketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
