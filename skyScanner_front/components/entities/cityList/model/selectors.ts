import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/components/app/store'
import { ICityListState } from './types'


const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.cityList
)

export const selectCityList = createSelector(
    selectBase,
    (state: ICityListState) => state.cities
)

export const selectCityListLoading = createSelector(
    selectBase,
    (state: ICityListState) => state.loading
)
export const selectCityListError = createSelector(
    selectBase,
    (state: ICityListState) => state.error
)
