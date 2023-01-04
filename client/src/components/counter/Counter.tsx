
import React from 'react'
import { increment } from '../../store/features/counter/counterSlice';
import { useAppDisptach, useAppSelector } from "../../store/hooks/hooks";


const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDisptach()
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Click</button>
    </div>
  )
}


export default Counter