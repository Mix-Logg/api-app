import { Test, TestingModule } from '@nestjs/testing';
import { RecordPlugController } from './record_plug.controller';
import { RecordPlugService } from './record_plug.service';

describe('RecordPlugController', () => {
  let controller: RecordPlugController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordPlugController],
      providers: [RecordPlugService],
    }).compile();

    controller = module.get<RecordPlugController>(RecordPlugController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
