import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LovesService } from './loves.service';
import { Loves } from 'src/schemas/Loves.schema';
import { JwtGuard } from 'src/auth/guards/JwtGuard';

@Controller('loves')
export class LovesController {

    constructor(private lovesService:LovesService){}

    @Post()
    createOrder(@Body() dto: Loves) {
      return this.lovesService.createLoves(dto);
    }


    @Get()
    getAll() {
      return this.lovesService.getAll();
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    delete(@Param('id') id: string) {
      return this.lovesService.delete(id);
    }

}
