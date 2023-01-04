import React, { Fragment, useState } from 'react'
import { afternoonIcon, closeIcon, doneIcon, humIcon, morningIcon, nigthIcon, storageIcon, tempIcon } from '../../assets'

interface IPropsReminderBox2 {
  humidity: number,
  temperature: number,
  stock: number,
  morningCheck: string,
  afternoonCheck: string,
  eveningCheck: string
}

const ReminderBox2: React.FC<IPropsReminderBox2> = ({ humidity, stock, temperature, morningCheck, afternoonCheck, eveningCheck }) => {



  return (
    <Fragment>
      <section className='xl:w-[260px] xl:h-[280px] relative bg-sky-300 xl:box-border xl:rounded-md xl:shadow-md '>
        <h1 className='xl:font-semibold xl:p-[10px] xl:text-md'>Medication reminder 3x1</h1>

        <div className='xl:px-[15px] flex items-start justify-center'>
          <div className='xl:flex relative hidden   xl:w-[80px]'>
            <img className='xl:w-[80px]  xl:h-[80px]' src={morningIcon} alt="" />
            <img className='inline-block  xl:w-[27px] absolute top-0 right-0 ' src={morningCheck} alt="" />
          </div>
          <div className='xl:flex relative  xl:w-[80px]'>
            <img className='xl:w-[80px] xl:h-[80px]' src={afternoonIcon} alt="" />
            <img className='inline-block xl:w-[30px] absolute top-0 right-0  ' src={afternoonCheck} alt="" />
          </div>
          <div className='xl:flex relative  xl:w-[50px]'>
            <img className='xl:w-[56px] xl:h-[56px]' src={nigthIcon} alt="" />
            <img className='inline-block xl:w-[30px] absolute top-0 right-0  ' src={eveningCheck} alt="" />
          </div>
        </div>

        <div className='shadow-inner bg-sky-400 xl:flex items-center justify-center absolute top-[116px] left-[87px]  rounded-full xl:w-[100px] xl:h-[100px] '>
          <div className='xl:flex'>
            <p className='xl:text-lg'>{stock}</p>
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
            :{temperature.toFixed(2)}&#8451;
          </p>
        </div>
      </section>

    </Fragment>
  )
}

export default ReminderBox2