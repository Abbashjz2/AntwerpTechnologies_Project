import React, { useEffect, useState } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../../components/Header/Header'
import Login from '../../components/Login/Login'
import Bg from '../LandingPage/background.jpg'

import './LandingPage.css'


const LandingPage = () => {
  const navigate = useNavigate()
  const { user ,isError1, message} = useSelector((state) => state.auth)
  const [log, setLog] = useState(false)

  useEffect(() => {
    if(isError1){
      toast.error(message)
    }
    if(user){
      navigate('/campaign')
    }
  }, [isError1,user,message, navigate])

  return (
    <div className=''> 
    <Header />
      {/* <Tabz/> */}
      <div className="landing d-flex h-100 justify-content-between flex-column flex-xl-row flex-md-row flex-xxl-row align-items-center mt-20 m-3">
        <div className="left-side w-75 w-md-25 w-xl-25 w-xxl-25 mt-sm-3 mx-2 d-flex justify-content-center flex-column">
            <h4>
              Creative Content
            </h4>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque illum pariatur et sunt possimus impedit quis voluptatibus consectetur omnis provident doloribus, culpa corrupti dolore sapiente eligendi repudiandae. Amet, quo nisi!
            </p>
            <button className='btn btn-primary rounded' onClick={()=> setLog(true)}>Join Now</button>
        </div>
        <div className="right-side w-100 w-md-75 w-xl-50 w-xxl-50 mx-2 mt-5 d-flex justify-content-center align-items-center">
        <img src={Bg}  className='landingImage w-xxl-25 w-xl-25'/>
        </div>
      </div>
      {log &&  <Login setLog={setLog}/>}
    </div>
  )
}

export default LandingPage