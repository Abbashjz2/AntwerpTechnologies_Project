import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import EachNotification from './component/EachNotification'
import './NotificationPage.css'

const NotificationPage = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)
  const [allUsers] = useState(location.state.allUsers)
  const [campaigns] = useState(location.state.campaigns)
  return (
    <div>
      <Header />
      {user.notification.length > 0 ? <div className='notfication-container'>
        {user.notification.map((notitification) => (
          <EachNotification notification={notitification} allUsers={allUsers} user={user} campaigns={campaigns} />
        ))}
      </div> : <div className='animate one'>
        <span>N</span><span>o</span>&nbsp;<span>N</span><span>o</span><span>t</span><span>i</span><span>f</span><span>i</span><span>c</span><span>a</span><span>t</span><span>i</span><span>o</span><span>n</span>
      </div>}
    </div>
  )
}

export default NotificationPage