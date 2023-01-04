import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../index";

export const useAppDisptach: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector