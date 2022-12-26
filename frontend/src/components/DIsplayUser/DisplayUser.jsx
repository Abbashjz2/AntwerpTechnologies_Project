import './DisplayUser.css'
import { useState } from 'react'
import logo from './img_avatar.png'
import { useEffect } from 'react'
const DisplayUser = ({user}) => {
    const [imagePath, setImagePath] = useState(user?.file)
    const updateImage = () => {
        if (user?.file) {
            let api = "api\\"
            const pathes = user?.file?.filePath.replace(api, '')
            setImagePath(pathes)
        }
    }
    useEffect(() => {
        updateImage()
    },[])
  return (
    <div className='secondMainContainer'>
        <div className='d-flex align-items-center miniContainer'>
        <div className='imgContainer'>
                <img className='imgLogo' src={user.file ? `http://localhost:5000/${imagePath}` : logo} />
            </div>
            <div>
        <h5>User Email: {user.email}</h5>
        <h5>User Name: {user.name}</h5>
            </div>

        </div>
    </div>
  )
}

export default DisplayUser