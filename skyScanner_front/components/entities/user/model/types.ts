import { IAirBus } from '@/components/shared/api/airbus'
import { IUser } from '@/components/shared/api/user'
import { RejectedDataType } from '@/components/shared/types/errorTypes'

export interface IUserState {
    /** List of books. */
    readonly user: IUser | null
    /** Data loading indicator. */
    readonly loading: boolean
    /** Error message. */
    readonly error: RejectedDataType | null
}
