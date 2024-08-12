import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/components/app/store'
import { IAirBusListState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.airBusList
)

export const selectAirBusListBooks = createSelector(
    selectBase,
    (state: IAirBusListState) => state.airBuses
)

export const selectAirBusListLoading = createSelector(
    selectBase,
    (state: IAirBusListState) => state.loading
)
export const selectAirBusListError = createSelector(
    selectBase,
    (state: IAirBusListState) => state.error
)
