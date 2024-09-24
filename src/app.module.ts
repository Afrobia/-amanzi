import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaterIntakeModule } from './water-intake/water-intake.module';


@Module({
  imports: [WaterIntakeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
