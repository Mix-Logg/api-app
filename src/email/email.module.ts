
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService], // Fornecer o EmailService aqui
  exports: [EmailService], // Exportar o EmailService se necessário
})
export class EmailModule {}