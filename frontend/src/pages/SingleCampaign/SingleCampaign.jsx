import axios from 'axios';
import { format } from 'date-fns';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import DisplayUser from '../../components/DIsplayUser/DisplayUser';
import Header from '../../components/Header/Header';
import './SingleCampaign.css'
const SingleCampaign = () => {
  const location = useLocation()
  const params = useParams();
  const [campaign, setCampaign] = useState([])
  const [campaigns, setCampaigns] = useState(location.state.campaigns)
  const [allUsers, setAllUsers] = useState(location.state.allUsers)
  const [userOwned, setUserOwned] = useState(location.state?.allUsers)
  const [usersMentioned, setUsersMentioned] = useState([])
  const fetchUser = () => {
    campaign?.users?.map((user1) => {
      allUsers?.map((user2) => {
        if (user1?.toString() === user2?._id?.toString()) {
          usersMentioned.push(user2)
        }
      })
    })
  }
  useEffect(() => {

    console.log(location.state);
    const getCampaign = () => {
      campaigns.map((campaign) => { 
        if(campaign._id.toString() === params.id.toString()){
          setCampaign(campaign)
          
        }
        return 1;
      }) 
    }
    const getCampaignOwner = () => {
      campaigns.map((campaign) => {
        if(campaign._id.toString() === params.id.toString()){
          allUsers.map((user) => {
            if(user._id.toString() === campaign.user.toString()){
                setUserOwned(user)
            }
          })
        }
      })
    }
    getCampaign()


    getCampaignOwner()
  }, [])
  fetchUser()
  const userMentionedSet = [...new Set(usersMentioned)]
  return (
    <>
      <Header />
      <div className='containter mainContainer'>
        <h1><b>Campaign Details:</b></h1>
        <div className='mt-3'>
        <Link to= {`/userinfo/${userOwned._id}`} state={{userOwned,campaigns,allUsers}}><h2><b>Campaign Owner: {userOwned.name}</b></h2></Link>
        </div>
        <div className='d-flex'>
          <div className='leftSide w-50'>
            <div className='details'>
              <h2>Name: {campaign.name}</h2>
            </div>
            <div className='details'>
              <h2>Type: {campaign.type}</h2>
            </div>
            <div className='details'>
              <h2>Date:  {campaign.createdAt && format(new Date(campaign.createdAt), 'MM/dd/yyyy')}</h2>
            </div>
          </div>
          <div className='rightSide'>
            <div className='detailsRight'>
              <h2>Users: </h2>
              {userMentionedSet.map((user, index) => (
                <DisplayUser allUsers={allUsers} campaigns={campaigns} user={user} key={user._id} />
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