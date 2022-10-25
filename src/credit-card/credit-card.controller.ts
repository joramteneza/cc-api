import { Controller, Get } from '@nestjs/common';
import { CreditCardService } from './credit-card.service';

@Controller('credit-card')
export class CreditCardController {
  constructor(private creditCardService: CreditCardService) {}

  @Get()
  creditCardController() {
    return this.creditCardService.getDataViaPuppeteer();
  }
}
