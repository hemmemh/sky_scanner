
export type panelInputLabel = 'from' | 'to' | 'depart' | 'return' | 'seatNumber' | 'seatClass'

export interface Info{
  from:string,
  to:string,
  seatNumber:number,
  seatClass:string,
  sort:Sort

}



export type russianStopName = 'прямой' | '1 пересадка' | '2 пересадки'
export type StopValue = 'direct' | 'oneTransfer' | 'twoTransfer'


export type Stop = {
  name: russianStopName;
  value: StopValue;
}
export type Sort =  'optimal' | 'cheapest' | 'fastest'

