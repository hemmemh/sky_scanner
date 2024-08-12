import dayjs from "dayjs"

export const msToHoursAndMinutes=(startDate:number, endDate:number)=>{

    const start = dayjs(startDate).format('HH:mm')
    const end = dayjs(endDate).format('HH:mm')
    const duration = dayjs.duration(endDate - startDate);

    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes() + 1;

    return {start, end, hours, minutes}
}

export const weekDayAndDatefromMs = (date:number)=>{
    const weekDay = dayjs(date).day()
    const data = dayjs(date).date()
    const month = dayjs(date).format('MMM')
    const year = dayjs(date).year()
    
    return `${weekDay}, ${data} ${month} ${year}`
    
    
      }

      export const monthAndDayFromMs = (date:number)=>{
   
        const data = dayjs(date).date()
        const month = dayjs(date).format('MMM')
  
        
        return `${data} ${month}`
        
        
          }


      export const  getHoursFromMs = (e:number) =>{
        e = e / 3600000
        return (e % 1) === 0 ? e.toFixed(0) : e.toFixed(1);
      }

      export const  getHoursAndMinutesFromMs = (e:number) =>{
        e = e / 3600000
        return (e % 1) === 0 ? e.toFixed(0) : e.toFixed(1);
      }

      export const getHoursAndMinutes = (date:number)=>{
        const calculatedHour = Math.floor(date  / 60); // Get the integer division result for hours
        const calculatedMinute = date % 60; // Get the remainder for minutes
        
        // Format into HH:mm
        return dayjs().hour(calculatedHour).minute(calculatedMinute).format('HH:mm');
      }

