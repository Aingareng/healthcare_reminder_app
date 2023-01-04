/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from 'react'
import { doneIcon, closeIcon, humIcon, tempIcon, morningIcon, afternoonIcon, nigthIcon, storageIcon } from '../../assets'
import { useAppSelector, useAppDisptach } from '../../store/hooks/hooks'





interface boxType {
  type: string,
  humidity: number,
  temperature: number,
  drugBox: number,
}

const MedicineStorageBox: React.FC<boxType> = ({ type, humidity, temperature, drugBox }) => {
  const states = useAppSelector(state => state.esp32State.result)
  const dispatch = useAppDisptach()

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
  const [newDate, setNewDate] = useState('')
  const [oldDate, setOldDate] = useState('')
  const [timeReference, setTimeReference] = useState('')
  const [morning_check, setMorning_check] = useState(closeIcon)
  const [affternoon_check, setAffternoon_check] = useState(closeIcon)
  const [evening_check, setEvening_check] = useState(closeIcon)



  const addTableData: object[] = []


  useEffect(() => {
    handleUserInterface()
    handleDrugsCheck()




  }, [states])

  const handleUserInterface = () => {
    try {
      states.forEach((value: any) => {
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

      if (timeReference >= '9:45:40 AM' && timeReference < '9:45:42 AM') {
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
    if (timeReference >= '9:45:40 AM') {
      setMorning_check(closeIcon)
      setAffternoon_check(closeIcon)
      setEvening_check(closeIcon)
    }
  }

  return (
    <Fragment>
      <section className='xl:w-[260px] xl:h-[280px] relative bg-sky-300 xl:box-border xl:rounded-md xl:shadow-md '>
        <h1 className='xl:font-semibold xl:p-[10px] xl:text-md'>{type}</h1>

        <div className='xl:p-[15px] flex items-start justify-around'>
          <div className='xl:flex relative hidden   xl:w-[60px]'>
            <img className='xl:w-[60px]  xl:h-[60px]' src={morningIcon} alt="" />
            <img className='inline-block  xl:w-[27px] absolute top-0 right-0 ' src={morning_check} alt="" />
          </div>
          <div className='xl:flex relative  xl:w-[60px]'>
            <img className='xl:w-[60px] xl:h-[60px]' src={afternoonIcon} alt="" />
            <img className='inline-block xl:w-[30px] absolute top-0 right-0  ' src={affternoon_check} alt="" />
          </div>
          <div className='xl:flex relative  xl:w-[50px] h-[50px]'>
            <img className='xl:w-[50px] xl:h-[50px]' src={nigthIcon} alt="" />
            <img className='inline-block xl:w-[30px] absolute top-0 right-0  ' src={evening_check} alt="" />
          </div>
        </div>

        <div className='shadow-inner bg-sky-400 xl:flex items-center justify-center absolute top-[118px] left-[90px]  rounded-full xl:w-[90px] xl:h-[90px] '>
          <div className='xl:flex'>
            <p>{drugBox}</p>
            <img className='xl:w-[20px] xl:h-[20px]' src={storageIcon} alt="" />
          </div>
        </div>

        <div className='xl:p-[15px] xl:flex absolute bottom-0 w-full xl:justify-evenly xl:items-center'>
          <p>
            <img className='inline-block xl:w-[40px]' src={humIcon} alt="" />
            :{humidity}%
          </p>
          <p>
            <img className='inline-block xl:w-[40px]' src={tempIcon} alt="" />
            : {temperature.toFixed(2)}&#8451;
          </p>
        </div>
      </section>

    </Fragment>
  )
}

export default MedicineStorageBox