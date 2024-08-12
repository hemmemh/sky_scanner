export {
    default as CityReducer,
} from './model/tripListSlice'
export { fetchCityList } from './model/cityListThunk'
export {
    selectCityList,
    selectCityListError,
    selectCityListLoading,
} from './model/selectors'
