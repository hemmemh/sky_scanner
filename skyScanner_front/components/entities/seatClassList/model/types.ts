import { IAirBus } from '@/components/shared/api/airbus'
import { ICity } from '@/components/shared/api/city'
import { ISeatClass } from '@/components/shared/api/seatClass'
import { ITrip } from '@/components/shared/api/trip/types'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface ISeatClassListState {
    /** List of books. */
    readonly seatClasses: ISeatClass[]
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
