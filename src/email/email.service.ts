import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import generateSecurityCode from '../../hooks/securityCode';

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
    if (fileDates.oneFile) {
      attachments = [
        {
          filename: `${fileDates.filename}.pdf`,
          content: sendEmailDTO.file.buffer,
        },
      ];
    } else {
      attachments = [
        {
          filename: `${fileDates.filename}.zip`,
          content: sendEmailDTO.file.buffer,
        },
      ];
    }
    const mailOptions = {
      to: fileDates.to,
      subject: fileDates.subject,
      text: fileDates.text,
      attachments,
    };
    try {
      const info = await this.transporter.sendMail(mailOptions);
      return 200;
    } catch (error) {
      return 500;
    }
  }

  async sendCode(email: string) {
    const code = generateSecurityCode();
    const htmlBody = `
    <body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh;">
    <div style="background-color: #FF5F00; font-weight: bold; padding: 24px; text-align: center;">
        
        <p style="font-size: 32px; color: #F4F4F4;">Olá!</p>
        <div style="justify-items: center; align-items: center;">
            <p style="font-size: 14px; color: #F4F4F4; width: 400px; text-align: justify;">Por favor, retorne à tela de login e insira o código abaixo para confirmar sua identidade.</p>

            <p style="font-size: 28px; color: #FF5F00; font-weight: bold; background-color: #F4F4F4; padding: 10px; border-radius: 10px;">${code}</p>
        </div>
        <p style="font-size: 10px; color: #E4E4E4; font-weight: light;">Este código é válido por 120 segundos, contados a partir do recebimento deste e-mail.</p>
    </div>
</body>
    `;
    const mailOptions = {
      to: email,
      subject: 'Código de verificação Mixservlog!',
      html: htmlBody,
    };
    try {
      await this.transporter.sendMail(mailOptions);
      const params = {
        msg: 'Success send code for email',
        code: code,
        status: 200,
      };
      return params;
    } catch (error) {
      return 500;
    }
  }
}
