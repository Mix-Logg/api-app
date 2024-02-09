import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: 'mixlogg2023@gmail.com',
            pass: 'cxpr hvqp umxb lepd', 
          },
        });
    }

    async sendEmail(to: string, subject: string, text: string, fileBlob:Blob, fileName:string) {
        const mailOptions = {
          to: to,
          subject: subject,
          text: text,
          filename: fileName,
          content: fileBlob
        };
        
        try {
          const info = await this.transporter.sendMail(mailOptions);
          console.log('E-mail enviado:', info.response);
        } catch (error) {
          console.error('Erro ao enviar e-mail:', error);
          throw error;
        }
    }
}

