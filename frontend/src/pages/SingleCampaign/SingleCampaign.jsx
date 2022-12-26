import axios from 'axios';
import { format } from 'date-fns';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DisplayUser from '../../components/DIsplayUser/DisplayUser';
import Header from '../../components/Header/Header';
import {TOKEN, userRequest} from '../../CustomRequest'
import { getUsers } from '../../features/auth/authSlice';
import './SingleCampaign.css'
const SingleCampaign = () => {
  const disspatch = useDispatch()
    const params = useParams();
    const [campaign, setCampaign] =useState([])
    
    const { allUsers } = useSelector(
        (state) => state.auth
    )
  
    const fetchUser = () => {
      campaign?.users?.map((user1) => {
          allUsers?.map((user2) => {
            if(user1?.toString() === user2?._id?.toString()){ 
              usersMentioned.push(user2)
              console.log("object");
              }
            })
          })
        }
        
    const [usersMentioned, setUsersMentioned] =useState([]) 
    useEffect(() => {

        const getCampaign = async (req,res) => {
            let config = { 
                headers: {
                  'Authorization': 'Bearer ' + TOKEN  
                }
              }
            try {  
               res = await axios.get(`http://localhost:5000/api/campaign/${params.id}`,config);
                setCampaign(res.data)
            }
             catch(err) {
              console.log(err)
            }
          };
          getCampaign()
 
         
          
      disspatch(getUsers()) 
    },[disspatch])
    fetchUser()
    return (
        <>
        <Header/>
    <div className='containter mainContainer'>
        <h1><b>Campaign Details:</b></h1>
        <div className='d-flex'>
        <div className='leftSide w-50'>
        <div className='details'>
        <h2>Name: {campaign.name}</h2>
        </div>
        <div className='details'>
        <h2>Type: {campaign.type}</h2>
        </div>
        <div className='details'>
        <h2>Date:  {campaign.createdAt  && format(new Date(campaign.createdAt), 'MM/dd/yyyy')}</h2>
        </div>
        </div>
        <div className='rightSide'>
          <div className='detailsRight'>
          <h2>Users: </h2>
          {usersMentioned.map((user,index) => (
            <DisplayUser user={user} key={user._id}/>
          ))}
           <div className='listItem'>
            
           </div>
        </div>
        </div>
          </div>
    </div>
        </>
  )
}

export default SingleCampaign