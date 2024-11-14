// src/consumption/consumption.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';

describe('ConsumptionController', () => {
  let controller: ConsumptionController;
  let service: ConsumptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumptionController],
      providers: [
        {
          provide: ConsumptionService,
          useValue: {
            registerConsumption: jest.fn(),
            getConsumptionHistory: jest.fn(),
            checkForAlert: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConsumptionController>(ConsumptionController);
    service = module.get<ConsumptionService>(ConsumptionService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  // Os demais testes ficam como estão
});
