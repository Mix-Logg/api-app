import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { DatabaseModule } from 'src/database/database.module';
import { taxProviders } from './tax.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [TaxController],
  providers:[...taxProviders,TaxService],
  exports:[TaxService]
})
export class TaxModule {}
