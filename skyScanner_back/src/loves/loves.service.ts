import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loves } from 'src/schemas/Loves.schema';
import { Repository } from 'typeorm';

@Injectable()
export class LovesService {
  constructor(
    @InjectRepository(Loves)
    private LovesRepo: Repository<Loves>,
  ) {}

  async createLoves(order: Loves): Promise<Loves> {
    return this.LovesRepo.save(order);
  }

  async getAll(): Promise<Loves[]> {
    return this.LovesRepo.find({});
  }

  async delete(id: string) {
    try {
      const finded = await this.LovesRepo.findOne({ where: { uid: id } });
      await this.LovesRepo.delete(id);
      return finded;
    } catch (error) {
      throw new BadRequestException('User not found');
    }
  }
}
