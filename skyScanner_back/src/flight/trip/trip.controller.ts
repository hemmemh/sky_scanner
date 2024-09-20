import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TripService } from './trip.service';
import { Public } from 'src/auth/guards/JwtGuard';
import { getAllTripsDTO } from './DTO/getAllTripsDTO';
import { getTripsWithReturnsDTO } from './DTO/getTripsWithReturnsDTO';
import { getTripsDTO } from './DTO/getTripsDTO';

@Controller('trip')
@Public()
export class TripController {
  constructor (private tripService: TripService) {}

    @Post('generate')
  generate () {
    return this.tripService.generate(1000,1727740800000,1730419199000, 2000, 5000);
  }

  

  
  @Get('getAllWithReturn/:depart/:return')
  getAllWithReturn( @Param('depart') departDate: number,
    @Param('return') returnDate: number,
   @Query() query: getAllTripsDTO,
  ) {
    console.log('ddf', departDate, returnDate, query);

    return this.tripService.getAllWithReturn(query, departDate, returnDate);
  }

  @Get('getAll/:depart')
  getAll(@Param('depart') departDate: number, @Query() query: getAllTripsDTO) {
    return this.tripService.getAll(query, departDate);
  }

  @Get('getAllWithReturnForCalendar/:depart/:return')
  getAllWithReturnForCalendar(
    @Param('depart') departDate: number,
    @Param('return') returnDate: number,
    @Query() query: getAllTripsDTO,
  ) {
    return this.tripService.getAllWithReturnForCalendar(
      query,
      departDate,
      returnDate,
    );
  }
  @Get('getTripsWithReturns/:depart/:return')
  getTripsWithReturns(
    @Param('depart') depart: string,
    @Param('return') returnData: string,
  ) {
    return this.tripService.getTripsWithReturns(depart, returnData);
  }

  @Get('getTrips/:depart')
  getTrips (@Param('depart') departDate: string) {
    console.log('dd', departDate);

    return this.tripService.getTrips(departDate);
  }
}

