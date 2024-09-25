import { Inject, Injectable } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { UploadLeadDto } from './dto/upload-lead-dto';
import { Lead } from './entities/lead.entity';
import { Repository } from 'typeorm';
import findTimeSP from 'hooks/time';
@Injectable()
export class LeadService {
  constructor(
    @Inject('LEAD_REPOSITORY') 
    private leadRepository: Repository<Lead>,
  ){}

  async create(createLeadDto: CreateLeadDto) {
    const lead = await this.findOnePhone(createLeadDto.phone)
    if(lead.status == 500){
      try{
        await this.leadRepository.save(createLeadDto);
      }catch(e){
        return {
          status:501,
          result:'Server error'
        }
      }
      return {
        status:201,
        result:'Successfully created lead'
      }
    }
    return {
      status:500,
      message:'Lead already exists'
    }
  }

  findAll() {
    return this.leadRepository.find();
  }

  async findAllStatistics() {
    try{
      let response;
  
      response = await this.leadRepository.find();
      const totalLead = response.length;
  
      response = await this.getLeadsGroupedByDayAndWeekday();
      const topDaysWithMostRecords = response;
  
      response = await this.getVehicleCounts();
      const totalVehicleByType = response;

      response = await this.getRecordsGroupedByDate();
      const totalRecordsCreate = response;
  
      return {
        status:200,
        totalLead:totalLead,
        totalRecordsCreate:totalRecordsCreate,
        totalVehicleByType: totalVehicleByType,
        topDaysWithMostRecords: topDaysWithMostRecords,
      }

    }catch(e){

      return {
        status:500,
        message:'Erro interno'
      }
    }

  }

  async findOne(id: number) {
    const lead = await this.leadRepository.findOne({where:{id}});
    if(lead != null){
      return lead
    }
    return {
      status:500,
      message:'Lead does not exist'
    }
  }

  async findOnePhone(phone: string) {
    const lead = await this.leadRepository.findOne({where:{phone}});
    if(lead != null){
      return {
        status:200,
        result:lead
      }
    }
    return {
      status:500,
      message:'Lead does not exist'
    }
  }

  async update(id: number, updateLeadDto: UpdateLeadDto) {
    const lead = await this.findOne(id);
    if(lead.status == 500){
      return {
        status:404,
        message:'Lead does not exist'
      }
    }
    const res = await this.leadRepository.update(id, updateLeadDto);
    if(res.affected){
      return {
        status:200,
         message:'Lead updated successfully'
      }
    }
    return {
      status:500,
      message:'Server error'
    }

  }

  async upload(leads: string[] , uploadLeadDto: UploadLeadDto) {
    let report = [];
    for (const row of leads) {
      const params = {
        id_admin: parseInt(uploadLeadDto.id_admin),
        phone: row[3],
        typeVehicle: row[4],
        name: row[2],
        create_at: findTimeSP(),
      };
      try {
        const response = await this.create(params);
        switch (response.status) {
          case 201:
            let success = {
              name: row[2].toUpperCase(),
              occurrence: 'Criado com sucesso'
            };
            report.push(success);
            break;
          case 500:
            let erro = {
              name: row[2].toUpperCase(),
              occurrence: 'já cadastrado'
            };
            report.push(erro);
            break;
          case 501:
            let erroServer = {
              name: row[2].toUpperCase(),
              occurrence: 'erro interno'
            };
            report.push(erroServer);
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Erro ao processar linha:", error);
      }
    }
    return report;
  }

  async remove(id: number) {
    return `This action removes a #${id} lead`;
  }

  private async getLeadsGroupedByDayAndWeekday(): Promise<any> {
    const response = await this.leadRepository
      .createQueryBuilder('lead')
      .select([
        "DATE_FORMAT(lead.create_at, '%d/%m/%Y') AS day", // Formato pt-BR para data
        `CASE 
          WHEN DAYOFWEEK(lead.create_at) = 1 THEN 'Domingo'
          WHEN DAYOFWEEK(lead.create_at) = 2 THEN 'Segunda-feira'
          WHEN DAYOFWEEK(lead.create_at) = 3 THEN 'Terça-feira'
          WHEN DAYOFWEEK(lead.create_at) = 4 THEN 'Quarta-feira'
          WHEN DAYOFWEEK(lead.create_at) = 5 THEN 'Quinta-feira'
          WHEN DAYOFWEEK(lead.create_at) = 6 THEN 'Sexta-feira'
          WHEN DAYOFWEEK(lead.create_at) = 7 THEN 'Sábado'
          END AS weekday`, // Dia da semana em português
        'COUNT(*) AS total_records', // Total de registros por dia
      ])
      .groupBy('day, weekday')
      .orderBy('total_records', 'DESC')
      .limit(5) // Limita o resultado a 5
      .getRawMany(); // Usamos getRawMany() para obter resultados "raw" (não transformados em entidade)

    return response;
  };

  private async getVehicleCounts(): Promise<any> {
    const vehicleCounts = await this.leadRepository
      .createQueryBuilder('lead')
      .select('lead.typeVehicle', 'typeVehicle') // Seleciona a coluna typeVehicle
      .addSelect('COUNT(*)', 'total')            // Contagem de registros por tipo
      .groupBy('lead.typeVehicle')               // Agrupa pelos tipos de veículo
      .orderBy('total', 'DESC')                  // Ordena pela contagem em ordem decrescente
      .getRawMany();                             // Retorna os resultados em formato raw

    return vehicleCounts;
  };

  private async getRecordsGroupedByDate() {
    return this.leadRepository
      .createQueryBuilder('record')
      .select('DATE(record.create_at) AS create_at')
      .addSelect('COUNT(*) AS total')
      .groupBy('DATE(record.create_at)')
      .orderBy('DATE(record.create_at)', 'ASC')
      .getRawMany();
  };
}
