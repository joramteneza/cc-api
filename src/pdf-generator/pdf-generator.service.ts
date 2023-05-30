import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as puppeteer from 'puppeteer';
import * as handlebars from 'handlebars';
import { generateQR } from 'src/utils/generateQrCode';

@Injectable()
export class PdfGeneratorService {
  async createPDF() {
    let ccBody = '';

    for (let i = 0; i < 10; i++) {
      const qrcode = await generateQR('123df2d5-749c-4660-95d2-01fae78f14f5');

      const data = {};

      const bodyHtml = fs.readFileSync(
        path.join(process.cwd(), 'body-template.html'),
        'utf8',
      );
      const bodyTemplate = handlebars.compile(bodyHtml);
      const html = bodyTemplate(data);

      ccBody = ccBody.concat(html);
    }

    const templateHtml = fs.readFileSync(
      path.join(process.cwd(), 'pdf-template.html'),
      'utf8',
    );
    const template = handlebars.compile(templateHtml);

    const data = {
      creditCard: ccBody,
    };

    const html = template(data);

    console.log(html);

    let milis: Date | number = new Date();
    milis = milis.getTime();

    const pdfPath = path.join(`${milis}.pdf`);

    const options = {
      path: pdfPath,
    };

    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 827,
      height: 1169,
      deviceScaleFactor: 1,
    });

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: 'networkidle0',
    });

    await page.pdf(options);
    await browser.close();

    return 'PDF Generator is working';
  }
}
