import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import EachNotification from './component/EachNotification'
import './NotificationPage.css'

const NotificationPage = () => {
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
console.log(user)
  })
  return (
    <div>
        <Header />
        <div className='notfication-container'>
          {user.notification.campaign.map((notitification) => (
            <EachNotification notification={notitification}/>
        ))}            
        </div>
    </div>
  )
}

export default NotificationPage