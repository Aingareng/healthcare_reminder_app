/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios";
import { useAppDisptach, useAppSelector } from '../../store/hooks/hooks';
import { incrementEsp32State } from '../../store/features/esp32/esp32State';
import { MedicineStorageBox, Topbar, ReminderTable, ReminderBox1, ReminderBox2, ReminderBox3 } from '../../components';
import { Helmet } from "react-helmet";
import { closeIcon, doneIcon, logo2 } from '../../assets';






const Home = () => {
  const state = useAppSelector(state => state.esp32State.result)
  const dispatch = useAppDisptach()
  const [sensors, setSensors] = useState({
    humidity1: 0,
    temperature1: 0,
    humidity2: 0,
    temperature2: 0,
    humidity3: 0,
    temperature3: 0,
  })

  const [timeCheck, setTimeCheck] = useState({
    morningTime: false,
    affternoonTime: false,
    eveningTime: false
  })

  const [updateDate, setUpdateDate] = useState({
    date: '',
    time: ''
  })

  const [oldDate, setOldDate] = useState('')


  const [handleTime, setHandleTime] = useState({
    morning: '-',
    affternoon: '-',
    evening: '-',
    date: ''
  })

  const [morningTime, setMorningTime] = useState('-')
  const [affternoonTime, setAffternoonTime] = useState('-')
  const [eveningTime, setEveningTime] = useState('-')

  const [table, setTable] = useState("1x1")
  const [drugStock, setDrugStock] = useState({
    box_1: 0,
    box_2: 0,
    box_3: 0
  })

  const [newDate, setNewDate] = useState('')
  // const [oldDate, setOldDate] = useState('')
  const [timeReference, setTimeReference] = useState('')
  const [morning_check, setMorning_check] = useState(closeIcon)
  const [affternoon_check, setAffternoon_check] = useState(closeIcon)
  const [evening_check, setEvening_check] = useState(closeIcon)



  const addTableData: object[] = []




  const [times, setTimes] = useState({
    morning: '',
    affternoon: '',
    evening: ''
  })
  const [checkTime, setCheckTime] = useState({
    morning: false,
    affternoon: false,
    evening: false
  })
  const [tableData, setTableData] = useState({
    date: '',
    morning: '',
    affternoon: '',
    evening: ''
  })

  useEffect(() => {
    fetchDataFromEsp32()
    handleDataList()
    handleUserInterface()
    handleDrugsCheck()

  }, [state])





  const fetchDataFromEsp32 = async () => {
    try {
      const result = await axios.get('http://localhost:8080/')
      const { data } = result

      dispatch(incrementEsp32State(data))
      localStorage.setItem("ESP32_STORAGE", JSON.stringify(state))

      // dispatch(insertTimeTable())
    } catch (error) {
      console.error(error)
    }
  }


  const handleDataList = () => {


    state?.forEach((val: any) => {
      const { update_time, update_date } = val
      const { Humidity1, temperature1, Humidity2, temperature2, Humidity3, temperature3, morningTime, affternoonTime, eveningTime, stockBox1, stockBox2, stockBox3 } = val.result
      setDrugStock({
        ...drugStock,
        box_1: stockBox1,
        box_2: stockBox2,
        box_3: stockBox3
      })
      setSensors({
        ...sensors,
        humidity1: Humidity1,
        temperature1,
        humidity2: Humidity2,
        temperature2,
        humidity3: Humidity3,
        temperature3
      })

      setTimeCheck({
        ...timeCheck,
        morningTime,
        affternoonTime,
        eveningTime
      })

      setUpdateDate({
        ...updateDate,
        date: update_date,
        time: update_time
      })

    })

    // const { date, time } = updateDate

    // const { morningTime, affternoonTime, eveningTime } = timeCheck


    // if (morningTime === true) {
    //   if (time >= '09:00:00 PM' && time <= '09:00:10 PM') {
    //     // timeTable.morning = time
    //     setMorningTime(time)


    //   } else { setMorningTime('-') }
    // } else {
    //   setMorningTime('-')
    // }
    // if (affternoonTime === true) {
    //   if (time >= '09:01:00 PM' && time <= '09:01:10 PM') {
    //     setAffternoonTime(time)

    //   } else { setAffternoonTime('-') }
    // } else {
    //   setAffternoonTime('-')
    // }

    // if (eveningTime === true) {
    //   if (time >= '09:02:00 PM' && time <= '09:02:10 PM') {
    //     // timeTable.evening = time
    //     setEveningTime(time)

    //   } else { setEveningTime('-') }
    // } else {
    //   setEveningTime('-')
    // }

    // localStorage.setItem("TIME_STORAGE", JSON.stringify(state))

  }



  const handleTableType = () => {

    switch (table) {
      case "1x1":
        return <ReminderTable drugsType='1x1 ' date={updateDate.date} timeTable={state} morningTime={morningTime} />
      case "2x1":

        return <ReminderTable drugsType='2x1' date={updateDate.date} morningTime={morningTime} affternoonTime={affternoonTime} />

      case "3x1":
        return <ReminderTable drugsType='3x1' date={updateDate.date} morningTime={morningTime} affternoonTime={affternoonTime} eveningTime={eveningTime} />

      default:
        break;
    }
  }





  const handleUserInterface = () => {
    try {
      state.forEach((value: any) => {
        let { morningTime, affternoonTime, eveningTime } = value.result

        setNewDate(value.update_date)
        setTimeReference(value.update_time)
        if (morningTime === true) {
          setTimes({
            ...times,
            morning: timeReference
          })
          setCheckTime({
            ...checkTime,
            morning: true
          })

        }
        if (affternoonTime === true) {
          setTimes({
            ...times,
            affternoon: timeReference
          })
          setCheckTime({
            ...checkTime,
            affternoon: true,
          })

        }
        if (eveningTime === true) {
          setTimes({
            ...times,
            evening: timeReference
          })
          setCheckTime({
            ...checkTime,
            evening: true
          })

        }

      });

      if (timeReference >= '5:27:40 PM' && timeReference < '5:27:42 PM') {
        setTableData({
          date: newDate,
          morning: times.morning,
          affternoon: times.affternoon,
          evening: times.evening
        })
        addTableData.push(tableData)
        localStorage.setItem("TABLE_STORAGE", JSON.stringify(addTableData))
        console.log(addTableData)
        setOldDate(newDate)
      }

    } catch (error) {
      console.error(error)
    }
  }


  const handleDrugsCheck = () => {
    const tableStorage: any = localStorage.getItem("TABLE_STORAGE")
    const storage = JSON.parse(tableStorage)

    storage?.forEach((element: any) => {
      if (element.date !== oldDate) {


      }

    })



    const { morning, affternoon, evening } = checkTime
    if (morning === true) {
      setMorning_check(doneIcon)
    } if (affternoon === true) {
      setAffternoon_check(doneIcon)
    } if (evening === true) {
      setEvening_check(doneIcon)
    }
    if (timeReference >= '5:27:40 PM') {
      setMorning_check(closeIcon)
      setAffternoon_check(closeIcon)
      setEvening_check(closeIcon)
    }
  }


  return (
    <Fragment>
      <Helmet>
        <title>Healthcare app</title>
        <link rel="icon" href={logo2} />
      </Helmet>
      <header className='xl:p-[10px] xl:shadow-md xl:fixed xl:top-0 xl:z-10 xl:backdrop-blur-xl w-full '>
        <Topbar />
      </header>
      <main className='xl:pt-[30px] '>
        <ul id='dashboard' className="xl:flex  xl:mt-[4%] xl:p-[8%]  xl:justify-center bg-[#ffff]">
          <li>
            <ReminderBox1 humidity={sensors.humidity1} temperature={sensors.temperature1} stock={drugStock.box_1} morningCheck={morning_check} />

          </li>
          <li className='xl:mx-[20px]'>
            <ReminderBox2 humidity={sensors.humidity2} temperature={sensors.temperature2} stock={drugStock.box_2} morningCheck={morning_check} afternoonCheck={affternoon_check} />
          </li>
          <li>
            <ReminderBox3 humidity={sensors.humidity3} temperature={sensors.temperature3} stock={drugStock.box_3} morningCheck={morning_check} afternoonCheck={affternoon_check} eveningCheck={evening_check} />
            {/* <MedicineStorageBox type='Reminder box : 3x1' humidity={sensors.humidity3} temperature={sensors.temperature3} drugBox={drugStock.box_3} /> */}
          </li>
        </ul>
        <div className="custom-shape-divider-top-1669766948">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
          </svg>
        </div>

        <section className='bg-slate-300 xl:pt-[15%] xl:text-center xl:p-[5%] '>
          <div className=' xl:bg-slate-200 xl:p-[20px] xl:w-[70%] xl:mx-auto xl:rounded-md xl:shadow-md'>
            <h1 id='table' className=' xl:text-xl font-semibold'>Table Reminder</h1>
            <div className='text-left'>

              {/* <select name="tableType" id="tableType" className='px-[10px] py-[3px] outline-none rounded-md' value={table} onChange={(e: any) => setTable(e.target.value)}>
                <option value='1x1'> Table 1x1</option>
                <option value="2x1"> Table 2x1</option>
                <option value="3x1"> Table 3x1</option>
              </select> */}
            </div>
            {/* <ReminderTable /> */}
            {handleTableType()}
          </div>
        </section>
      </main>
    </Fragment>
  )
}

export default Home