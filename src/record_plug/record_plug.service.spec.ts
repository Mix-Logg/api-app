import { Test, TestingModule } from '@nestjs/testing';
import { RecordPlugService } from './record_plug.service';

describe('RecordPlugService', () => {
  let service: RecordPlugService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecordPlugService],
    }).compile();

    service = module.get<RecordPlugService>(RecordPlugService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
