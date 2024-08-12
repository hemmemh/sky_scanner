import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '@/components/app/store'
import { ISeatClassListState } from './types'



const selectBase = createSelector(
    (state: RootState) => state,
    (state) => state.seatClassList
)

export const selectSeatClassList = createSelector(
    selectBase,
    (state: ISeatClassListState) => state.seatClasses
)

export const selectSeatClassListLoading = createSelector(
    selectBase,
    (state: ISeatClassListState) => state.loading
)
export const selectSeatClassListError = createSelector(
    selectBase,
    (state: ISeatClassListState) => state.error
)
