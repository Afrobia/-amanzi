import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/application/users.module';
import { AppService } from './app.service';
import { GeoclimateModule } from './geoclimate/application/geoclimate.module';
import { DbModule } from './db/db.module';
import { WaterCalculatorModule } from './water-calculator/water-calculator.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DbModule,
    UsersModule,
    GeoclimateModule,
    WaterCalculatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
