// src/consumption/consumption.controller.ts
import { Controller, Post, Get, Body, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { Consumption } from './consumption.entity';

@Controller('consumption')
export class ConsumptionController {
  constructor(private readonly consumptionService: ConsumptionService) {}

  @Post()
  async registerConsumption(@Body('userId') userId: string, @Body('amount') amount: number): Promise<Consumption> {
    return await this.consumptionService.registerConsumption(userId, amount);
  }

  @Get('history')
  async getConsumptionHistory(
    @Query('userId') userId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<Consumption[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return await this.consumptionService.getConsumptionHistory(userId, start, end);
  }

  @Get('alert')
  async getAlertStatus(@Query('userId') userId: string): Promise<{ alert: boolean }> {
    const alert = await this.consumptionService.checkForAlert(userId);
    if (!alert) throw new HttpException('No alert for this user', HttpStatus.NOT_FOUND);
    return { alert };
  }
}
