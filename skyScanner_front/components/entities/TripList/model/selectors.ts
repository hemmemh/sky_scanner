import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/components/app/store'
import { ITripListState } from './types'

const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.tripList
)

export const selectTripList = createSelector(
    selectBase,
    (state: ITripListState) => state.trips
)

export const selectTripsListLoading = createSelector(
    selectBase,
    (state: ITripListState) => state.loading
)
export const selectTripListError = createSelector(
    selectBase,
    (state: ITripListState) => state.error
)

export const selectPage = createSelector(
    selectBase,
    (state: ITripListState) => state.page
)

export const selectAllTrips = createSelector(
    selectBase,
    (state: ITripListState) => state.allTrips
)

export const selectMinTime = createSelector(
    selectBase,
    (state: ITripListState) => state.minTime
)

export const selectMaxTime = createSelector(
    selectBase,
    (state: ITripListState) => state.maxTime
)

export const selectMinDepartureTime = createSelector(
    selectBase,
    (state: ITripListState) => state.minDepartureTime
)
export const selectMaxDepartureTime = createSelector(
    selectBase,
    (state: ITripListState) => state.maxDepartureTime
)





