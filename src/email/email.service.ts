import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmail } from 'src/admin/dto/sendEmail-admin.dto'; 
import * as fs from 'fs';

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
    async sendEmail(sendEmailDTO) {
      const fileDates = JSON.parse(sendEmailDTO.body);
      let attachments;
      if(fileDates.oneFile){
          attachments = [
            {
                filename: `${fileDates.filename}.pdf`,
                content: sendEmailDTO.file.buffer,
              }
          ];
      }else{
        attachments = [
            {
              filename: `${fileDates.filename}.zip`,
              content: sendEmailDTO.file.buffer,
            }
        ];
      }
      const mailOptions = {
        to: fileDates.to,
        subject: fileDates.subject,
        text: fileDates.text,
        attachments
      };
      try {
        console.log('Enviado 1x')
        const info = await this.transporter.sendMail(mailOptions);
        return 200
      } catch (error) {
        return 500
      }
    }
}

