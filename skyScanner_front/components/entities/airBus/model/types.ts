import { IAirBus } from '@/components/shared/api/airbus'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface IAirBusListState {
    /** List of books. */
    readonly airBuses: IAirBus[] | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
