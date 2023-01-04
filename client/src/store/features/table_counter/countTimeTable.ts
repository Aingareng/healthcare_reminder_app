import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../..";

interface timeTable {
  field: object[]
}

const initialState: timeTable = {
  field: []
}

export const countTimeTable = createSlice({
  name: 'add_time_table',
  initialState,
  reducers: {
    insertTimeTable: (state, action: PayloadAction<[]>) => {
      const { field } = state
      field.push(action.payload)

    }
  }
})

export const { insertTimeTable } = countTimeTable.actions
export const selectTimeTable = (state: RootState) => state.counter.value

export default countTimeTable.reducer