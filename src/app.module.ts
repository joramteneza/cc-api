import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreditCardModule } from './credit-card/credit-card.module';
import { PdfGeneratorModule } from './pdf-generator/pdf-generator.module';

@Module({
  imports: [CreditCardModule, PdfGeneratorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
