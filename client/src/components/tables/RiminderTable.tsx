import React, { Fragment, useEffect, useState } from 'react'
import { useAppSelector } from '../../store/hooks/hooks';

interface IPropsTable {
  drugsType?: string,
  date?: string,
  morningTime?: string,
  affternoonTime?: string,
  eveningTime?: string,
  timeTable?: []
}

const RiminderTable: React.FC<IPropsTable> = ({ drugsType, date, timeTable, morningTime, affternoonTime, eveningTime }) => {
  const state = useAppSelector(state => state.esp32State.result)

  const [timeState, setTimeState] = useState({
    morning: false,
    affternoon: false,
    evening: false,
  })

  const [dateState, setDateState] = useState({
    update_time: '',
    update_date: '',
  })

  // const [date, setDate] = useState('')
  const [morning, setMorning] = useState('')
  const [affternoon, setAffternoon] = useState('')
  const [evening, setEvening] = useState('')
  // const [time, setTime] = useState({
  //   morning: '',
  //   affternoon: '',
  //   evening: ''
  // })

  const [tableReminder, setTableReiminder] = useState([])

  useEffect(() => {
    const storage: any = localStorage.getItem("TABLE_STORAGE")
    const tableStorage = JSON.parse(storage)

    setTableReiminder(tableStorage)

    // handleDateTable()

  }, [state])

  const handleDateTable = () => {
    if (timeState.morning === true) {
      // setDate(dateState.update_date)
      if (dateState.update_time <= '10:22:45 PM') {
        setMorning(dateState.update_time)
      }
    } else {
      setMorning('-')
    }
    if (timeState.affternoon === true) {
      if (dateState.update_time <= '10:22:45 PM') {
        setAffternoon(dateState.update_time)

      }
    } else {
      setAffternoon('-')
    }

    if (timeState.evening === true) {
      if (dateState.update_time <= '10:22:45 PM') {
        // setDate(dateState.update_date)
        setEvening(dateState.update_time)
      }
    } else {
      setEvening('-')
    }



  }


  return (
    <>
      <table className='table-auto  border-collapse border xl:mt-[20px] xl:mx-auto border-slate-100 w-full'>
        <thead>
          <tr className=''>
            <th className='border-2 border-slate-500 '>No</th>
            {/* <th className='border-2 border-slate-500 '>Drugs</th> */}
            <th className='border-2 border-slate-500 '>Date</th>
            <th className='border-2 border-slate-500 '>Time
              <table className='w-full'>
                <thead>
                  <tr>
                    <td className='border-t border-r-2 border-slate-500'>Morning</td>
                    <td className='border-t border-r-2 border-slate-500'>Affternoon</td>
                    <td className='border-t-2 border-slate-500'>Evening</td>
                  </tr>
                </thead>
              </table>
            </th>
          </tr>
        </thead>
        <tbody>
          {
            tableReminder?.map((val: any, index: number) => (
              <tr key={index} className='border-b-2 border-slate-500'>
                <td className='border-t border-l border-r-2 border-slate-500'>{index + 1}</td>
                {/* <td className='border-t border-r-2 border-slate-500'>{drugsType}</td> */}
                <td className='border-t border-r-2 border-slate-500'>{val.date}</td>
                <td className='border-t border-r-2 border-slate-500'>
                  <table className=' w-full'>
                    <tbody >
                      <tr className=''>
                        <td className=' border-2 w-[29%]' >{val.morning}</td>
                        <td className=' border-2 w-[40%]' >{val.affternoon}</td>
                        <td className=' border-2 w-[29%]' >{val.evening}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </ >
  )
}

export default RiminderTable