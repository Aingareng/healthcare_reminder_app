import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { counterSlice, esp32State, countTimeTable } from "../store/features"


export const store = configureStore({
  reducer: {
    counter: counterSlice,
    esp32State,
    countTimeTable
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

