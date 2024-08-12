import { Module } from '@nestjs/common';
import { LovesController } from './loves.controller';
import { LovesService } from './loves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loves } from 'src/schemas/Loves.schema';

@Module({
  controllers: [LovesController],
  providers: [LovesService],
  imports:[
    TypeOrmModule.forFeature([
       Loves
     ]),
  ],
})
export class LovesModule {}
