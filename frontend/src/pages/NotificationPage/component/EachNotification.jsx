import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeNotification } from '../../../features/auth/authSlice'

const EachNotification = ({notification,campaigns,allUsers,user}) => {
    const dispatch = useDispatch()
    const removeNoti = () => {
        const data = {
            userId: user._id,
            id: notification._id
        }
        dispatch(removeNotification(data))
      }
    return (
        <Link to={`/singlecampagin/${notification.campaign._id}`} state={{allUsers,campaigns}} onClick={removeNoti}  >
            <div className='notification'>
            You are mentioned in a campaign, that's ID: {notification.campaign._id} and name: {notification.campaign.name}
        </div>
        </Link>
    )
}

export default EachNotification