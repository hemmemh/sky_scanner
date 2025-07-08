import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AirbusService } from 'src/flight/airbus/airbus.service';
import { CityService } from 'src/flight/city/city.service';
import { CompanyService } from 'src/flight/company/company.service';
import { SeatClassService } from 'src/flight/seat-class/seat-class.service';
import { CreateManyTripDTO } from 'src/flight/trip/DTO/createManyDTO';
import { TripService } from 'src/flight/trip/trip.service';

@Injectable()
export class InitService implements OnApplicationBootstrap {

    constructor(
        private cityCervice:CityService,
        private airBusService:AirbusService,
        private companyService:CompanyService,
        private seatClassService:SeatClassService,
        private tripService:TripService,
    ){}

 async onApplicationBootstrap() {
     await this.runInitialSetup();
  }

  private async runInitialSetup(){
       await this.cityCervice.createByFirstInit()
       await this.airBusService.createByFirstInit()
       await this.companyService.createByFirstInit()
       await this.seatClassService.createByFirstInit()

       const dto: CreateManyTripDTO = {
        numbers:15000,
        startDate: new Date().valueOf(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).valueOf(),
        startPrice:5000,
        endPrice:16000
       }

       await this.tripService.generate(dto)
  }
}
