import { Injectable } from '@nestjs/common';
import { CreateWhatDto } from './dto/create-what.dto';
import { UpdateWhatDto } from './dto/update-what.dto';
import { Client, LocalAuth} from 'whatsapp-web.js'
import * as qrcode from 'qrcode-terminal';
import * as path from 'path';
import { exec } from 'child_process';
@Injectable()
export class WhatsService {

  private readonly chromeDir = path.resolve(__dirname, '../../../chrome');
  private readonly chromePackageUrl = 'https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb';
  private readonly chromePackagePath = `${this.chromeDir}/google-chrome-stable_current_amd64.deb`;
  private client: Client;

  constructor() {
    this.installAndExtractChrome();
    this.initWhatsAppClient()
  }

  private installAndExtractChrome() {
    console.log(`Baixando Google Chrome de ${this.chromePackageUrl}`);
    exec(`wget -O ${this.chromePackagePath} ${this.chromePackageUrl}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao baixar o Google Chrome: ${error.message}`);
      }
      if (stderr) {
        console.error(`Erro ao baixar o Google Chrome: ${stderr}`);
      }
      setTimeout(() => {
        exec(`dpkg -x ${this.chromePackagePath} ${this.chromeDir}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao extrair o Google Chrome: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Erro ao extrair o Google Chrome: ${stderr}`);
            return;
          }
  
          console.log(`Google Chrome extraído com sucesso em: ${this.chromeDir}`);
  
          // Inicialize o cliente WhatsApp ou outra lógica aqui após a extração
          // this.initWhatsAppClient();
        });
      }, 4000);
      setTimeout(() => {
          this.initWhatsAppClient();
      }, 6000);
    });
  }
  
  private initWhatsAppClient() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        executablePath: path.resolve(__dirname, '../../../chrome/opt/chrome.exe'),
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--unhandled-rejections=strict',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ],
      },
      webVersionCache: {
      type: 'remote',
      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2410.1.html',
      }
    });

    this.client.on('qr', qr => {
      console.log(qr)
      qrcode.generate(qr, {small: true});
    });

    this.client.on('ready', () => {
      console.log('Cliente está pronto!');
    });

    this.client.initialize();
  }

  create(createWhatDto: CreateWhatDto) {
    return 'This action adds a new what';
  }

  findAll() {
    return `This action returns all whats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} what`;
  }

  update(id: number, updateWhatDto: UpdateWhatDto) {
    return `This action updates a #${id} what`;
  }

  remove(id: number) {
    return `This action removes a #${id} what`;
  }
}
