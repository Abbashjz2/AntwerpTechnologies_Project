import React from 'react'
import './UserCampaign.css'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import UserCampaignRow from './components/UserCampaignRow'
import { useEffect } from 'react'

const UserCampaign = () => {
    const location = useLocation()
    const {user1, allCampaignPerUser, mentionedCampaign, allUsers} = location.state
    useEffect(() => {
        console.log(location.state)
    },[])
    return (
        <div>
            <Header />
                {allCampaignPerUser ? <h4>You are in the campaign that created by  <b>{user1.name}</b></h4> : 
                <h4>You are in the campaign that mentioned to  <b>{user1.name}</b></h4>
                }
            <table className="table table-striped mt-3 tableScale">
                <thead>
                    <tr>
                        <th scope='col' ><div style={{ cursor: 'pointer', maxWidth: 'max-content' }}><span style={{ marginRight: 10 }}>Id</span></div></th>
                        <th scope='col' >Campaign Name</th>
                        <th scope='col'>Users</th>
                        <th scope='col'>Type</th>
                        <th scope='col'><div style={{ cursor: 'pointer' }}><span style={{ marginRight: 10 }}>Date</span> </div></th>
                        <th scope='col'>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {allCampaignPerUser && allCampaignPerUser.map((campaign) => (
                        <UserCampaignRow campaign={campaign} allUsers={allUsers} allCampaignPerUser={allCampaignPerUser} key={campaign._id} />
                    ))
                    }
                    {
                       mentionedCampaign && mentionedCampaign.map((campaign) => (
                        <UserCampaignRow campaign={campaign} allUsers={allUsers} mentionedCampaign={mentionedCampaign} key={campaign._id} />
                    )) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserCampaign