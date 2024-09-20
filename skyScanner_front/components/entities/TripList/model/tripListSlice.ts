import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITripListState } from "./types";
import { fetchTripList, fetchTripListForCalendar } from "./tripListThunk";

const initialState: ITripListState = {
  trips: null,
  calendarTrips: {
    departTrips: [],
    returnTrips: [],
  },
  minTime: 0,
  maxTime: 0,
  minDepartureTime: 0,
  maxDepartureTime: 0,
  page: 1,
  loading: false,
  calendarTripsloading: false,
  error: null,
  allTrips: 100,
};

const TripListSlice = createSlice({
  name: "tripList",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchTripList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTripList.fulfilled, (state, action) => {
        console.log("cc", action);

        state.trips = action.payload ? action.payload.trips : null;
        state.minTime = action.payload ? action.payload.minTime : 0;
        state.maxTime = action.payload ? action.payload.maxTime : 0;
        state.minDepartureTime = action.payload
          ? action.payload.minDepartureTime
          : 0;
        state.maxDepartureTime = action.payload
          ? action.payload.maxDepartureTime
          : 0;
        state.allTrips = action.payload ? action.payload.allTrips : 100;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTripList.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTripListForCalendar.pending, (state) => {
        state.calendarTripsloading = true;
      })
      .addCase(fetchTripListForCalendar.fulfilled, (state, action) => {
        state.calendarTrips = action.payload;
        state.calendarTripsloading = false;
      })
      .addCase(fetchTripListForCalendar.rejected, (state) => {
        state.calendarTripsloading = false;
      }),
});

export default TripListSlice.reducer;
export const { setPage } = TripListSlice.actions;
