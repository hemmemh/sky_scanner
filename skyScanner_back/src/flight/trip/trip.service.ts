import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from 'src/schemas/Trip.schema';
import { Between, In, Not, Repository } from 'typeorm';
import { getAllTripsDTO, StopValue } from './DTO/getAllTripsDTO';
import * as dayjs from 'dayjs';
import { CityService } from '../city/city.service';
import { CompanyService } from '../company/company.service';
import { AirbusService } from '../airbus/airbus.service';
import {
  getArrayCombinations,
  getMinMaxDepartureTime,
  getMinMaxDepartureTimeWithReturn,
  getMinMaxTime,
  getMinMaxTimeWithReturn,
  getMonthDaysInMilliseconds,
  getRandomElementFromArray,
  getRandomInteger,
  isSameDay,
} from './lib/lib';
import { City } from 'src/schemas/City.schema';
import { SeatClassService } from '../seat-class/seat-class.service';
import { getAllData } from './DTO/getAllData';
import { getAllWithReturnData } from './DTO/getAllWithReturnData';
import { getTripsForCalendarDTO } from './DTO/getTripsForCalendatDTO';

@Injectable()
export class TripService {
  constructor (
    @InjectRepository(Trip)
    private TripRepo: Repository<Trip>,
    private cityService: CityService,
    private companyService: CompanyService,
    private seatClassService: SeatClassService,
    private airbusService: AirbusService,
  ){}

  async getAllWithReturn (query:getAllTripsDTO, departDate:number, returnDate:number): Promise<getAllWithReturnData> {

    try {
      let resultDepartTrips:Trip[][] = []
      let resultReturnTrips:Trip[][] = []
      const departTime = dayjs(+departDate)
      const returnTime = dayjs(+returnDate)
      const time = query.time ? query.time.split('%2C') :  []
      const departureTimeFiltr = query.departureTimeFiltr ? query.departureTimeFiltr.split('%2C') :  []
      const stops:StopValue[] = query.stops ? query.stops.split('%2C') as StopValue[] : []
      const page =query.page ?  +query.page : 1
      const count =  4
      console.log('page', page);

      let departureTrips = await this.TripRepo.find({
        where:{
          departure_city:{ uid:query.from },
          //arrival_city:{uid:query.to},
          seats:+query.seatNumber,
          seatClass:{ uid:query.seatClass }
        }
      })



      let returnTrips = await this.TripRepo.find({
        where:{
          departure_city:{ uid:query.to },
          //arrival_city:{uid:query.from},
          seats:+query.seatNumber,
          seatClass:{ uid:query.seatClass }
        }
      })



      departureTrips = departureTrips.filter(el=>{
        return isSameDay(dayjs(+el.departure_time), departTime)
      })

      returnTrips = returnTrips.filter(el=>{
        return isSameDay(dayjs(+el.departure_time), returnTime)
      })

      for (const departureTrip of departureTrips){
        const startTrips =  [...departureTrips.filter(el=>el.uid !== departureTrip.uid).map(el=>el.uid)]


        const data =  await this.getTransfers(query.to ,departureTrip, startTrips , departureTrip.departure_city, departureTrip)

        resultDepartTrips = [...resultDepartTrips, ...data.resultTrips]
      }

      for (const returnTrip of returnTrips){
        const startTrips =  [...returnTrips.filter(el=>el.uid !== returnTrip.uid).map(el=>el.uid)]


        const data =  await this.getTransfers(query.from ,returnTrip, startTrips , returnTrip.departure_city, returnTrip)

        resultReturnTrips = [...resultReturnTrips, ...data.resultTrips]
      }
  
      let trips =   getArrayCombinations<Trip>(resultDepartTrips ,resultReturnTrips )
      

      switch (query.sort) {
      case 'optimal': trips.sort((a,b)=>{
        const weightPrice =1000; // вес цены
            const weightDuration = 0.5; // вес времени полета

        const AlastIndex = a[0].length - 1
        const BlastIndex = b[0].length - 1
        const first = +a[0][AlastIndex].arrival_time - +a[0][0].departure_time
        const second = +b[0][BlastIndex].arrival_time - +b[0][0].departure_time
        const sumPriceA = a[0].reduce((prev:0, current:Trip)=> current.price + prev ,0)
        const sumPriceb = b[0].reduce((prev:0, current:Trip)=> current.price + prev ,0)
        const optimalityA = weightPrice * sumPriceA + weightDuration * first;
        const optimalityB = weightPrice * sumPriceb + weightDuration * second;
        return optimalityA - optimalityB;

      })
        break
      case 'cheapest': trips.sort((a,b)=>{
        const sumPriceOtboundA = a[0].reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        const sumPriceReturnA = a[1].reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        console.log('GG', sumPriceOtboundA + sumPriceReturnA);

        const sumPriceOtboundB = b[0].reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        const sumPriceReturnB = b[1].reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        return (sumPriceOtboundA + sumPriceReturnA) -  (sumPriceOtboundB + sumPriceReturnB)
      })
        break;
      case 'fastest':trips.sort((a,b)=>{
        const AlastIndexOutBound = a[0].length - 1;
        const BlastIndexOutBound = b[0].length - 1;
        const firstOutBound =
              a[0][AlastIndexOutBound].arrival_time - a[0][0].departure_time;
        const secondOutBound =
              b[0][BlastIndexOutBound].arrival_time - b[0][0].departure_time;

        const AlastIndexReturn = a[1].length - 1;
        const BlastIndexReturn = b[1].length - 1;
        const firstReturn =
              a[1][AlastIndexReturn].arrival_time - a[1][0].departure_time;
        const secondReturn =
              b[1][BlastIndexReturn].arrival_time - b[1][0].departure_time;
        return (
              Math.max(firstReturn, firstOutBound) -
              Math.max(secondReturn, secondOutBound)
        )
      })
        break;
        default:
          break;
      }

      const { minTime, maxTime } = getMinMaxTimeWithReturn(trips)
      const { minDepartureTime, maxDepartureTime } = getMinMaxDepartureTimeWithReturn(trips)

      if (departureTimeFiltr.length !== 0) {
        trips = [...trips.filter(el=>{
          const tripDepartTime = dayjs(+el[0][0].departure_time).minute() +  (dayjs(+el[0][0].departure_time).hour() * 60)
         
          return tripDepartTime >= +departureTimeFiltr[0]  && tripDepartTime <= +departureTimeFiltr[1]
        })]
      }


      if (time.length !== 0) {
        trips = [...trips.filter(el=>{
          const tripFirstTime = +el[0][el[0].length - 1].arrival_time - +el[0][0].departure_time
          const tripSecondTime = +el[1][el[1].length - 1].arrival_time - +el[1][0].departure_time


          return tripFirstTime >= +time[0]  && tripFirstTime <= +time[1] &&
              tripSecondTime >= +time[0] &&
              tripSecondTime <= +time[1]
        })]
      }

      if (stops.length !== 0) {

        if (stops.includes('direct')) trips = [...trips.filter(el=>el[0].length !== 1 && el[1].length !== 1)]
        if (stops.includes('oneTransfer')) trips = [...trips.filter(el=>el[0].length !== 2 && el[1].length !== 2)]
        if (stops.includes('twoTransfer')) trips = [...trips.filter(el=>el[0].length <= 2 &&  el[1].length <= 2)]

      }

      return {
        trips:trips.slice(0, count * page),
        minTime,
        maxTime,
        minDepartureTime,
        maxDepartureTime,
        allTrips:trips.length


      }
    } catch (error) {
      throw new HttpException('недостаточно данных', HttpStatus.BAD_REQUEST);
    }

  }

  async getTransfers (endCity:string, startTrip:Trip,startTrips:string[], startCity:City, trip:Trip ,  tripsToCity:Trip[] = [], resultTrips:Trip[][] = [], maxTarnsfer = 4){
    const startTripsTwo = []
    const maxDiff = 21600000
    let endTime  = +trip.arrival_time + maxDiff
    const  startDay = dayjs(+trip.arrival_time).date()
    const  endDay = dayjs(endTime).date()
    if (startDay !== endDay && startTrip.uid === trip.uid) {
      endTime = dayjs(+trip.arrival_time).endOf('d').valueOf()

    }

    let nextTrips = [startTrip]

    if (startTrip.departure_city.uid !== startCity.uid) {
      console.log('ddd', startCity);
      nextTrips = await this.TripRepo.find({
        where:{
          uid:Not(In(startTrips)),
          departure_city:{ uid:startCity.uid },
          seats:+trip.seats,
          seatClass:{ uid:trip.seatClass.uid },
          departure_time:Between(trip.arrival_time, endTime),

        }
      })
    }









    for (const nextTrip of nextTrips){
      if (nextTrip.arrival_city.uid === startTrip.departure_city.uid) continue
      if (nextTrip.arrival_city.uid === endCity) {


        tripsToCity.push(nextTrip)
        if (tripsToCity.length > maxTarnsfer) {
          break

        }
        resultTrips.push([...tripsToCity])
        tripsToCity.pop();

        continue
      }

      tripsToCity.push(nextTrip)

      if (tripsToCity.length > maxTarnsfer) {
        break

      }

      if (startTrip.departure_city.uid == nextTrip.arrival_city.uid) {
        continue
      }

      const data = await  this.getTransfers(endCity, startTrip, startTrips, nextTrip.arrival_city , nextTrip, tripsToCity, resultTrips)

      tripsToCity = [...data.tripsToCity]
      resultTrips = [...data.resultTrips]

    }


    tripsToCity.pop()
    return { resultTrips, tripsToCity }
       
  }

  async getAll (query:getAllTripsDTO, departDate:number): Promise<getAllData> {
    try {
      let resultTrips: Trip[][] = [];

      const time = query.time ? query.time.split('%2C') :  []
      const departureTimeFiltr = query.departureTimeFiltr ? query.departureTimeFiltr.split('%2C') :  []
      const stops:StopValue[] = query.stops ? query.stops.split('%2C') as StopValue[] : []
      const departTime = dayjs(+departDate)
      const page =query.page ?  +query.page : 1
      const count =  4
      console.log('time', query);


      let departureTrips = await this.TripRepo.find({
        where:{
          departure_city:{ uid:query.from },
          //arrival_city:{uid:query.to},
          seats:+query.seatNumber,
          seatClass:{ uid:query.seatClass }
        }
      })
        
      departureTrips = departureTrips.filter(el=>{
        return isSameDay(dayjs(+el.departure_time), departTime)
      })

      for (const departureTrip of departureTrips){
        const startTrips =  [...departureTrips.filter(el=>el.uid !== departureTrip.uid).map(el=>el.uid)]


        const data =  await this.getTransfers(query.to ,departureTrip, startTrips , departureTrip.departure_city, departureTrip)

        resultTrips = [...resultTrips, ...data.resultTrips]
      }

      switch (query.sort) {

      case 'optimal': resultTrips.sort((a,b)=>{
        console.log('!!!!!!!!!');

        const AlastIndex = a.length - 1;
        const BlastIndex = b.length - 1;

        const first = +a[AlastIndex].arrival_time - +a[0].departure_time;
        const second = +b[BlastIndex].arrival_time - +b[0].departure_time;
        const weightPrice = 1000; // вес цены
        const weightDuration = 0.5; // вес времени полета
        const sumPriceA = a.reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        const sumPriceb = b.reduce(
              (prev: 0, current: Trip) => current.price + prev,
              0,
            );
        const optimalityA =
              weightPrice * sumPriceA + weightDuration * first;
        const optimalityB =
              weightPrice * sumPriceb + weightDuration * second;
        return optimalityA - optimalityB;
          });
          break;
      case 'cheapest': resultTrips = resultTrips.sort((a,b)=>{


        const sumPriceA = a.reduce(
              (prev: 0, current: Trip) => +current.price + prev,
              0,
            );
        const sumPriceb = b.reduce(
              (prev: 0, current: Trip) => +current.price + prev,
              0,
            );
        console.log('aa', sumPriceA, sumPriceb);
        return sumPriceA -  sumPriceb
      });
        break;
      case 'fastest': resultTrips.sort((a,b)=>{
        console.log('!!!!!!!!!@@@@@@');
        const AlastIndex = a.length - 1;
        const BlastIndex = b.length - 1;
        const first = a[AlastIndex].arrival_time - a[0].departure_time;
        const second = b[BlastIndex].arrival_time - b[0].departure_time;
        return first - second;
      });
        break;
        default:
        break;
      }

      console.log('resultTrips', resultTrips);

      const { minTime, maxTime } = getMinMaxTime(resultTrips)
      const { minDepartureTime, maxDepartureTime } = getMinMaxDepartureTime(resultTrips)

      if (departureTimeFiltr.length !== 0) {
        resultTrips = [...resultTrips.filter(el=>{
          const tripDepartTime =
              dayjs(+el[0].departure_time).minute() +
              dayjs(+el[0].departure_time).hour() * 60;
          console.log('tripDepartTime', tripDepartTime);

      
          return tripDepartTime >= +departureTimeFiltr[0]  && tripDepartTime <= +departureTimeFiltr[1]
        })]
      }
        
      if (time.length !== 0) {
        resultTrips = [...resultTrips].filter(el=>{
          const tripTime =
              +el[el.length - 1].arrival_time - +el[0].departure_time;
            return tripTime >= +time[0] && tripTime <= +time[1];
        })
      }

      if (stops.length !== 0) {
        if (stops.includes('direct')) resultTrips = [...resultTrips.filter(el=>el.length !== 1)]
        if (stops.includes('oneTransfer')) resultTrips = [...resultTrips.filter(el=>el.length !== 2)]
        if (stops.includes('twoTransfer')) resultTrips = [...resultTrips.filter(el=>el.length <= 2)]

      }

      return {
        trips:resultTrips.slice(0, count * page),
        minTime,
        maxTime,
        minDepartureTime,
        maxDepartureTime,
        allTrips:resultTrips.length

      }

    } catch (error) {

      console.log('error',error.message);

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }


  }

  async getTripsWithReturns (depart:string, returnDate:string): Promise<[Trip[], Trip[]]>{
    try {
      const departTrips = [];
      const  returnTrips = []
      for (const tripUid of  depart.split(',')){
        const trip =await this.TripRepo.findOne({ where:{ uid:tripUid } })
        console.log('ttt', trip);

        if (trip) {
          departTrips.push(trip)
        }

      }

      for (const tripUid of returnDate.split(',')){
        const trip = await this.TripRepo.findOne({ where:{ uid:tripUid } })
        if (trip) {
          returnTrips.push(trip)
        }

      }

      return [departTrips, returnTrips]
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getTrips (depart:string): Promise<Trip[]>{
    try {
      console.log('depart.split(',')', depart.split(','));

      const trips = []
      for (const tripUid of depart.split(',')){
        const trip =await this.TripRepo.findOne({ where:{ uid:tripUid } })
        if (trip) {
          trips.push(trip)
        }

      }
      return trips
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async generate (numbers = 1000,startDate:number, endDate:number, startPrice:number, endPrice:number){
    const cities = await this.cityService.getAll()
    const companies  = await this.companyService.getAll()
    const airBuses  = await this.airbusService.getAll()
    const seatClass =  await this.seatClassService.getOne('c177a3f7-b48b-4062-b9d4-0ad4fc7817fc')
    while (numbers > 0){
      const departure_time = getRandomInteger(startDate, endDate)
      const arrival_time = getRandomInteger(departure_time,departure_time + 18000000)
      const price =  getRandomInteger(startPrice, endPrice)
      const seats = 1

      const departure_city = getRandomElementFromArray(cities)
      const indexOfcity =  cities.findIndex(el=>el.uid === departure_city.uid)
      let newCities = [...cities]
      newCities.splice(indexOfcity,1)
      const arrival_city = getRandomElementFromArray(newCities)
      const company = getRandomElementFromArray(companies)
      const airBus = getRandomElementFromArray(airBuses)




      await this.TripRepo.save({
        seats,
        airBus,
        company,
        departure_city,
        arrival_city,
        departure_time,
        arrival_time,
        paths:[],
        price,
        seatClass,
      })
      numbers-=1
    }







  }

  async getAllWithReturnForCalendar (query:getAllTripsDTO, departDate:number, returnDate:number): Promise<getTripsForCalendarDTO> {

    try {
      const departDays = getMonthDaysInMilliseconds(+departDate)
      const returnDays = getMonthDaysInMilliseconds(+returnDate)

      let resultDepartTrips:number[] = []
      let resultReturnTrips:number[] = []

      for (const departDay of departDays){
        const departTime = dayjs(+departDay)

        let departureTrips = await this.TripRepo.find({
          where:{
            departure_city:{ uid:query.from },
            //arrival_city:{uid:query.to},
            seats:+query.seatNumber,
            seatClass:{ uid:query.seatClass }
          }
        })

        departureTrips = departureTrips.filter(el=>{
          return isSameDay(dayjs(+el.departure_time), departTime)
        })


        for (const departureTrip of departureTrips){
          const startTrips =  [...departureTrips.filter(el=>el.uid !== departureTrip.uid).map(el=>el.uid)]


          const results =  await this.getTransfers(query.to ,departureTrip, startTrips , departureTrip.departure_city, departureTrip)


          if (results.resultTrips.length !== 0) {
            resultDepartTrips = [...resultDepartTrips, departDay]
            break
          }
           
        }

      }

      for (const returnDay of returnDays){
        const returnTime = dayjs(+returnDay)

        let returnTrips = await this.TripRepo.find({
          where:{
            departure_city:{ uid:query.to },
            //arrival_city:{uid:query.from},
            seats:+query.seatNumber,
            seatClass:{ uid:query.seatClass }
          }
        })

        returnTrips = returnTrips.filter(el=>{
          return isSameDay(dayjs(+el.departure_time), returnTime)
        })
  
        for (const returnTrip of returnTrips){
          const startTrips =  [...returnTrips.filter(el=>el.uid !== returnTrip.uid).map(el=>el.uid)]


          const results =  await this.getTransfers(query.from ,returnTrip, startTrips , returnTrip.departure_city, returnTrip)



          if (results.resultTrips.length !== 0) {
            resultReturnTrips = [...resultReturnTrips, returnDay]
            break
          }
        }

      }

      return {
        departTrips:resultDepartTrips,
        returnTrips:resultReturnTrips
      }
    } catch (error) {
      throw new HttpException('недостаточно данных', HttpStatus.BAD_REQUEST);
    }

  }

  async getTransfersForCalendar (endCity:string, startTrip:Trip,startTrips:string[], startCity:City, trip:Trip ,  tripsToCity:Trip[] = [], resultTrips:Trip[][] = [], maxTarnsfer = 4){
   {
    const maxDiff = 21600000;
    let endTime  = +trip.arrival_time + maxDiff
    const  startDay = dayjs(+trip.arrival_time).date()
    const  endDay = dayjs(endTime).date()
    if (startDay !== endDay && startTrip.uid === trip.uid) {
      endTime = dayjs(+trip.arrival_time).endOf('d').valueOf()

    }

    let nextTrips = [startTrip]


    if (startTrip.departure_city.uid !== startCity.uid) {
      console.log('ddd', startCity);
      nextTrips = await this.TripRepo.find({
        where:{
          uid:Not(In(startTrips)),
          departure_city:{ uid:startCity.uid },
          seats:+trip.seats,
          seatClass:{ uid:trip.seatClass.uid },
          departure_time:Between(trip.arrival_time, endTime),

        }
      })
    }









    for (const nextTrip of nextTrips){
      if (nextTrip.arrival_city.uid === startTrip.departure_city.uid) continue
      if (nextTrip.arrival_city.uid === endCity) {


        tripsToCity.push(nextTrip)
        if (tripsToCity.length > maxTarnsfer) {
          break

        }
        resultTrips.push([...tripsToCity])
        tripsToCity.pop();

        continue
      }

      tripsToCity.push(nextTrip)

      if (tripsToCity.length > maxTarnsfer) {
        break

      }

      if (startTrip.departure_city.uid == nextTrip.arrival_city.uid) {
        continue
      }

      const data = await  this.getTransfers(endCity, startTrip, startTrips, nextTrip.arrival_city , nextTrip, tripsToCity, resultTrips)

      tripsToCity = [...data.tripsToCity]
      resultTrips = [...data.resultTrips]

    }
    tripsToCity.pop();
    return { resultTrips, tripsToCity }


  }
  }
}
