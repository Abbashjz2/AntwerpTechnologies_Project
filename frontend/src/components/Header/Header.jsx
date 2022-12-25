import React from 'react'
import './Header.css'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {AiFillProfile} from 'react-icons/ai'
import {BiLogOut} from 'react-icons/bi'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { useSelector, useDispatch } from 'react-redux'
import Logo from './antwerp-technologie-logo-01-2.png'
import Avatar from './img_avatar.png'
import { useState } from 'react'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const Header = () => {
    const { user } = useSelector((state) => state.auth)
    const [imagePath, setImagePath] = useState(user?.file)
    const dispatch = useDispatch()
    const [log, setLog] = useState(false)
    const [register, setRegister] = useState(false)
    const [dropdown, setDropDown] =useState(false)
    
    const navigate = useNavigate()
    const onLogOut = () => {
        dispatch(logout())
        navigate('/')
    }
    const updateImage = () => {
        if (user?.file) {
            let api = "api\\"
            const pathes = user.file.replace(api, '')
            setImagePath(pathes)
        }
    }
    useEffect(()=> {
        updateImage()
    },[user])
    return (
        
        <>
        <div className='d-flex justify-content-between w-100 navbar bg-light p-3'>
            
            <div className='p-2' onClick={() => navigate('/campaign')} style={{cursor:'pointer'}}>
                <img src={Logo} width={200}/>
            </div>
            { !user ? 
            <div className='d-flex mx-3'>
                <div onClick={() => setLog(true)} className='fabtn p-2'><FaSignInAlt  /> Login</div>
                <div onClick={() => setRegister(true)} className='fabtn p-2'><FaUser /> Register</div>
            </div>
             : <div className='d-flex flex-column justify-content-center align-items-center mx-3 position-relative'>
                {/* <button onClick={onLogOut} className='btn btn-primary rounded'><FaSignOutAlt/> Logout</button> */}
                <div className='d-flex align-items-center' style={{cursor:'pointer'}} onClick={() => setDropDown(!dropdown)}>
                    <div className='px-3 mt-2'><h4>{user.name}</h4></div>
                <img src={`http://localhost:5000/${imagePath}`}  className='avatar' />
                </div>
                {dropdown && <div className='avatar-div position-absolute'>
                <ul className='avatar-ul w-100 d-flex flex-column justify-content-center align-items-center'>
                    <li className='avatar-li' onClick={() => navigate('/profile')}><AiFillProfile className='iconHeader'/> Profile</li>
                    <li className='avatar-li' onClick={onLogOut}><BiLogOut className='iconHeader'/> Logout</li>
                </ul>
                </div>}
             </div>}
        </div>
        {
            register && !log && 
            <Register setRegister={setRegister} />}
        
        {log && !register && <Login setLog={setLog}/>}
        </>
    )
}

export default Header