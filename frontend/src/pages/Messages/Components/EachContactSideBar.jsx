import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeUserInbox, getMessages } from '../../../features/auth/authSlice'

const EachContactSideBar = ({user}) => {
    const [imagePath, setImagePath] = useState(user?.file?.filePath)
    const updateImage = () => {
        if (user?.file) {
            let api = "api\\"
            const pathes = user?.file?.filePath?.replace(api, '')
            setImagePath(pathes)
        }
    }
    useEffect(() => {
        updateImage()
    }, [])
    const dispatch = useDispatch()
    const changeInbox = () => {
        dispatch(changeUserInbox(user._id))
    }
  return (
    <div className="list-group-item list-group-item-action border-0" onClick={changeInbox}>
    <div className="d-flex align-items-start">
      <img src={user.file ? `http://localhost:5000/${imagePath}` : "https://bootdey.com/img/Content/avatar/avatar5.png"} alt="Profile" className="rounded-circle mr-1" width="40" height="40"/>
      <div className="flex-grow-1 ml-3">
        {user.name}
      </div>
    </div>
  </div>
  )
}

export default EachContactSideBar