import { Module }          from '@nestjs/common';
import { TeamService }     from './team.service';
import { TeamController }  from './team.controller';
import { DatabaseModule }  from 'src/database/database.module';
import { teamProviders }   from './team.provider';
import { DriverModule }    from 'src/driver/driver.module';
import { AuxiliaryModule } from 'src/auxiliary/auxiliary.module';
import { VehicleModule }   from 'src/vehicle/vehicle.module';
import { OperationModule } from 'src/operation/operation.module';

@Module({
  imports:[DatabaseModule, DriverModule, AuxiliaryModule, VehicleModule, OperationModule],
  controllers: [TeamController],
  providers: [...teamProviders,TeamService],
})
export class TeamModule {}
