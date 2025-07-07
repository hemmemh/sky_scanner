import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { airBusesArray } from 'src/data/dataForDb';
import { AirBus } from 'src/schemas/AirBus.schema';
import { Repository } from 'typeorm';

@Injectable()
export class AirbusService {
  constructor(
    @InjectRepository(AirBus)
    private AirBusRepo: Repository<AirBus>,
  ) {}

  async isEmpty(): Promise<boolean> {
    const count = await this.AirBusRepo.count();
    return count === 0;
  }

  async createAirBus(airBus: AirBus): Promise<AirBus> {
    return this.AirBusRepo.save(airBus);
  }

  async getAll(): Promise<AirBus[]> {
    return this.AirBusRepo.find({});
  }

  async createByFirstInit(): Promise<AirBus[]> {
    const isEmpty = await this.isEmpty()
    if(!isEmpty) return
    const airBuses = airBusesArray;
    for (const airBus of airBuses) {
      await this.AirBusRepo.save(airBus);
    }
    return this.getAll();
  }
}
