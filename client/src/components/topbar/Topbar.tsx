import React, { Fragment } from 'react'
import { logo } from '../../assets'


const Topbar = () => {
  return (
    <Fragment>
      <section className='xl:flex xl:items-center '>
        <div >
          <img className='xl:w-[200px]' src={logo} alt="" />
        </div>
        <span className='mx-[10px]'>|</span>
        <nav className='w-[30%] '>
          <ul className='xl:flex xl:justify-evenly xl:w-[37%]'>
            <li className='cursor-pointer xl:ease-in xl:duration-200 hover:underline  hover:underline-offset-8'>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li className='cursor-pointer xl:ease-in xl:duration-200 hover:underline  hover:underline-offset-8'>
              <a href="#table">Table</a>
            </li>
          </ul>
        </nav>
      </section>
    </Fragment>
  )
}

export default Topbar