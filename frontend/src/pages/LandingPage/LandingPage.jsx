import React, { useEffect } from 'react'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Header from '../../components/Header/Header'
import Bg from '../LandingPage/background.jpg'
import './LandingPage.css'


const LandingPage = () => {
  const navigate = useNavigate()
  const { user ,isError1, message} = useSelector((state) => state.auth)

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
      <div className="h-100 landing d-flex justify-content-between align-items-center  m-3">
        <div className="left-side w-25 mx-2 d-flex justify-content-center flex-column">
            <h2>
              Creative Content
            </h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque illum pariatur et sunt possimus impedit quis voluptatibus consectetur omnis provident doloribus, culpa corrupti dolore sapiente eligendi repudiandae. Amet, quo nisi!
            </p>
            <button className='btn btn-primary rounded'>Join Now</button>
        </div>
        <div className="right-side w-75 mx-2 d-flex justify-content-center align-items-center">
        <img src={Bg}  className='landingImage w-xxl-25 w-xl-25'/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage