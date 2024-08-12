import { IAirBus } from '@/components/shared/api/airbus'
import {ITrip } from '@/components/shared/api/trip/types'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface ITripListState {
    /** List of books. */
    readonly trips: [ITrip[], ITrip[]] | ITrip[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
