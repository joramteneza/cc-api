import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CreditCardService {
  async getDataViaPuppeteer() {
    const URL =
      'https://www.vcdelivery.com/certificate/1378624?id=6inXrmBJxvZ96JFlLUwQyImbDqISIrAObvgls73tcX4hMEL4Av3ND24GnMARJCEiFR43UTmxv%2fg2t1wFLlZ%2bqe2EiJ4IdltQLpSJbfEQtTAPthc%2bIHTzUuNq2KD5HU9oVNflz15DDqepObe16GG82Q%3d%3d';

    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    // await browser.close();
    page.on('response', async (response) => {
      console.log('XHR response not received');

      console.log('response', await response.url());
      console.log('response', await response.url());

      if (response.url() === 'https://www.amexrewardcard.com/csp_report') {
        console.log('XHR response received');
        try {
          const result = JSON.parse(await response.json());
          console.log(result);
        } catch (err) {
          console.log('error', err);
        }
      }
    });

    return 'Credit Card Controller is Working!';
  }
}
