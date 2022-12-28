import './DisplayUser.css'
import { useState } from 'react'
import logo from './img_avatar.png'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const DisplayUser = ({user, campaigns,allUsers}) => {
    const navigate = useNavigate()
    const [imagePath, setImagePath] = useState(user?.file)
    const [userOwned, setUserOwned] = useState(user)
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
    <div className='secondMainContainer' style={{cursor:"pointer"}}>
        <Link to= {`/userinfo/${user._id}`} state={{userOwned,campaigns,allUsers}}>
        <div className='d-flex align-items-center miniContainer'>
        <div className='imgContainer'>
                <img className='imgLogo' src={user.file ? `http://localhost:5000/${imagePath}` : logo} />
            </div>
            <div>
        <h5>Email: {user.email}</h5>
        <h5>Name: {user.name}</h5>
            </div>

        </div>
        </Link>
    </div>
  )
}

export default DisplayUser