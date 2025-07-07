import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { citiesArray } from 'src/data/dataForDb';
import { City } from 'src/schemas/City.schema';

import { Repository } from 'typeorm';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private CityRepo: Repository<City>,
  ) {}

  async isEmpty(): Promise<boolean> {
    const count = await this.CityRepo.count();
    return count === 0;
  }

  async createCity(city: City) {
    try {
      return this.CityRepo.save(city);
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<City[]> {
    return this.CityRepo.find({});
  }

  async createByFirstInit(): Promise<City[]> {
    const isEmpty = await this.isEmpty()
    if(!isEmpty) return
    const cities = citiesArray;
    for (const city of cities) {
      await this.CityRepo.save({ name: city });
    }
    return this.getAll();
  }
}
