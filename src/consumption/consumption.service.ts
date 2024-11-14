// src/consumption/consumption.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Consumption } from './consumption.entity';


@Injectable()
export class ConsumptionService {
  constructor(
    @InjectRepository(Consumption)
    private consumptionRepository: Repository<Consumption>,
  ) {}

  async registerConsumption(userId: string, amount: number): Promise<Consumption> {
    const consumption = this.consumptionRepository.create({ userId, consumptionAmount: amount });
    return await this.consumptionRepository.save(consumption);
  }

  async getConsumptionHistory(userId: string, startDate: Date, endDate: Date): Promise<Consumption[]> {
    return await this.consumptionRepository.find({
      where: { userId, readingDate: Between(startDate, endDate) },
      order: { readingDate: 'ASC' },
    });
  }

  async checkForAlert(userId: string): Promise<boolean> {
    const [lastMonth, currentMonth] = await this.consumptionRepository.find({
      where: { userId },
      order: { readingDate: 'DESC' },
      take: 2,
    });

    return lastMonth && currentMonth ? currentMonth.consumptionAmount > lastMonth.consumptionAmount : false;
  }
}
