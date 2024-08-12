export {
    default as SeatClassReducer,
} from './model/tripListSlice'
export { fetchSeatClassList } from './model/seatClassListThunk'
export {
    selectSeatClassList,
    selectSeatClassListError,
    selectSeatClassListLoading,
} from './model/selectors'
