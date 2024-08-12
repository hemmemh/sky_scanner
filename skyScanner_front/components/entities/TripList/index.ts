export {
    default as TripReducer,
} from './model/tripListSlice'
export {setPage} from './model/tripListSlice'
export { fetchTripList, } from './model/tripListThunk'
export {
    selectTripList,
    selectMinTime,
    selectMaxTime,
    selectMinDepartureTime,
    selectMaxDepartureTime,
    selectTripListError,
    selectPage,
    selectAllTrips,
    selectTripsListLoading,
} from './model/selectors'
