import { getAllAirBus } from "@/components/shared/api/airbus/airbus";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAirBusList = createAsyncThunk("airBus/getAll", async () => {
  try {
    console.log("TTT");
    const response = await getAllAirBus();

    return response;
  } catch (err) {
    console.log(err);

    return null;
  }
});
