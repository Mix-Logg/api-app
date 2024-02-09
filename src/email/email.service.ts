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

    async sendEmail(to: string, subject: string, text: string, oneFile:boolean, content?:Uint8Array, contentBlob?:Uint8Array ) {
      let attachments = [];
      if (oneFile) {
        const fileBuffer = await Buffer.from(content);
        attachments.push({
          filename : 'Agregado-MIX',
          content: fileBuffer,
          contentType: "application/pdf"
        });
      } else {
        // console.log('blob',contentBlob)
        attachments.push({
          filename: 'Agregado-MIX',
          content: contentBlob,
          contentType: 'application/zip'
        });
      }
      // console.log(attachments)
      const mailOptions = {
        to: to,
        subject: subject,
        text: text,
        attachments:attachments
      }
      try {
        const info = await this.transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.response);
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
      }
      
    };
}

