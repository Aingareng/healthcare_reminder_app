import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface esp32State {
  result: []
}
const initialState: esp32State = {
  result: []
}

export const esp32State = createSlice({
  name: 'esp32 state',
  initialState,
  reducers: {
    incrementEsp32State: (state, action: PayloadAction<[]>) => {

      state.result = action.payload
    }
  }
})

export const { incrementEsp32State } = esp32State.actions
export const selectEsp32State = (state: RootState) => state.counter.value

export default esp32State.reducer