import { ISeatClass } from '@/components/shared/api/seatClass'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface ISeatClassListState {
    /** List of books. */
    readonly seatClasses: ISeatClass[]
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
