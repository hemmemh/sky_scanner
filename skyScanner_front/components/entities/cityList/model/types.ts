import { IAirBus } from '@/components/shared/api/airbus'
import { ICity } from '@/components/shared/api/city'
import { ITrip } from '@/components/shared/api/trip/types'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface ICityListState {
    /** List of books. */
    readonly cities: ICity[]
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
