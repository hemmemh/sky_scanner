import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { seatClassArray } from 'src/data/dataForDb';
import { SeatClass } from 'src/schemas/SeatClass.schema';
import { Repository } from 'typeorm';

@Injectable()
export class SeatClassService {
  constructor(
    @InjectRepository(SeatClass)
    private seatClassRepo: Repository<SeatClass>,
  ) {}

  async createSeatClass(seatClass: SeatClass) {
    try {
      return this.seatClassRepo.save(seatClass);
    } catch (error) {
      return error;
    }
  }

  async getAll(): Promise<SeatClass[]> {
    return this.seatClassRepo.find({});
  }

  async getOne(id: string): Promise<SeatClass> {
    return this.seatClassRepo.findOne({ where: { uid: id } });
  }

  async getOneByName(name: string): Promise<SeatClass> {
    return this.seatClassRepo.createQueryBuilder("seat_class")
    .where("seat_class.name ->> 'ru' = :name", { name })
    .getOne();
  }

  async createMany(): Promise<SeatClass[]> {
    const seatClasses = seatClassArray;
    for (const seatClass of seatClasses) {
      await this.seatClassRepo.save(seatClass);
    }
    return this.getAll();
  }
}
