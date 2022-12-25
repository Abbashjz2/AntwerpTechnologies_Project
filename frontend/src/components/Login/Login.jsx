import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import './Login.css'

const Login = ({setLog}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { user, isLoading, isError1, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {  email, password} = formData
    
    const onChange = (e) => {
        setFormData((prevState) =>( {
            ...prevState, 
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()
        
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
        if(isError1){
            navigate('/')
            dispatch(reset())
        }
        setLog(false)
    }
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <div className='loginPopUp d-flex justify-content-center flex-column align-items-center'>
                    <h1>
                        <div className="shadow d-flex align-items-center">
                        <div className='mx-1'>
                        <FaSignInAlt />
                        </div><div className='mx-1'> Login
                        </div>
                        </div>
                    </h1>
                    <h4 className='text-light'><b>Login to access Your Campaign</b></h4>
                </div>
                <form onSubmit={onSubmit} className='mt-2'>
                    <div onClick={() => setLog(false)} className='close'>&#x2716;</div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Email:</label>
                        <input type="email" name='email' className="form-control" onChange={onChange}/>
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Password:</label>
                        <input type="password" name='password'  className="form-control" onChange={onChange}/>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type='submit' name='name' className='btn btn-primary text-center mx-1 mt-2'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login