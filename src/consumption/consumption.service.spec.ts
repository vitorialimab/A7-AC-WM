// src/consumption/consumption.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionService } from './consumption.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Consumption } from './consumption.entity';
import { Repository } from 'typeorm';

describe('ConsumptionService', () => {
  let service: ConsumptionService;
  let repo: Repository<Consumption>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConsumptionService,
        {
          provide: getRepositoryToken(Consumption),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ConsumptionService>(ConsumptionService);
    repo = module.get<Repository<Consumption>>(getRepositoryToken(Consumption));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve registrar o consumo de água', async () => {
    const userId = 'user1';
    const amount = 50;
    const mockConsumption = { userId, consumptionAmount: amount } as Consumption;

    jest.spyOn(repo, 'create').mockReturnValueOnce(mockConsumption);
    jest.spyOn(repo, 'save').mockResolvedValueOnce(mockConsumption);

    const result = await service.registerConsumption(userId, amount);
    expect(result).toHaveProperty('userId', userId);
    expect(result).toHaveProperty('consumptionAmount', amount);
  });

  it('deve retornar o histórico de consumo', async () => {
    const userId = 'user1';
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    jest.spyOn(repo, 'find').mockResolvedValueOnce([{ userId, readingDate: startDate, consumptionAmount: 50 }] as Consumption[]);

    const result = await service.getConsumptionHistory(userId, startDate, endDate);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('consumptionAmount', 50);
  });

  it('deve gerar um alerta de consumo elevado', async () => {
    const userId = 'user1';
    const lastMonth = { userId, readingDate: new Date('2024-01-01'), consumptionAmount: 100 } as Consumption;
    const currentMonth = { userId, readingDate: new Date('2024-02-01'), consumptionAmount: 200 } as Consumption;
    jest.spyOn(repo, 'find').mockResolvedValueOnce([lastMonth, currentMonth]);

    const alert = await service.checkForAlert(userId);
    expect(alert).toBe(true);
  });
});
