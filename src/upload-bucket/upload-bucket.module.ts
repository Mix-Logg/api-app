import { Module } from '@nestjs/common';
import { UploadBucketService } from './upload-bucket.service';
import { UploadBucketController } from './upload-bucket.controller';

@Module({
  controllers: [UploadBucketController],
  providers: [UploadBucketService],
})
export class UploadBucketModule {}
