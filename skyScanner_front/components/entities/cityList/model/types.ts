import { ICity } from "@/components/shared/api/city";
import { RejectedDataType } from "@/components/shared/types/errorTypes";

export interface ICityListState {
  /** List of books. */
  readonly cities: ICity[];
  /** Data loading indicator. */
  readonly loading: boolean;
  /** Error message. */
  readonly error: RejectedDataType | null;
}
