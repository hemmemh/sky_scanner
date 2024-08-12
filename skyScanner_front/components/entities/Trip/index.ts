export {
    default as TripsReducer,
} from './model/tripSlice'
export { fetchTrips } from './model/tripThunk'
export {
    selectTrips,
    selectTripsError,
    selectTripsLoading,
} from './model/selectors'
