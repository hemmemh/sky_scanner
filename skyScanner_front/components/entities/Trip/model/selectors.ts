import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/components/app/store'
import { ITripListState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.trips
)

export const selectTrips = createSelector(
    selectBase,
    (state: ITripListState) => state.trips
)

export const selectTripsLoading = createSelector(
    selectBase,
    (state: ITripListState) => state.loading
)
export const selectTripsError = createSelector(
    selectBase,
    (state: ITripListState) => state.error
)
