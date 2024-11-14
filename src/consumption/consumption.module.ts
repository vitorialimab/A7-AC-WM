// src/consumption/consumption.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';
import { Consumption } from './consumption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consumption])],
  providers: [ConsumptionService],
  controllers: [ConsumptionController],
})
export class ConsumptionModule {}
