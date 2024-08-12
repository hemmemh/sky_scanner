import { IAirBus } from '@/components/shared/api/airbus'
import {ITrip } from '@/components/shared/api/trip/types'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface ITripListState {
    /** List of books. */
    readonly trips: [ITrip[], ITrip[]][] | ITrip[][] | null
    readonly minTime:number
    readonly page:number
    readonly maxTime:number
    readonly allTrips:number
    readonly minDepartureTime:number
    readonly maxDepartureTime:number
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
