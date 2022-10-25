import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';

@Module({
  controllers: [CreditCardController],
  providers: [CreditCardService]
})
export class CreditCardModule {}
