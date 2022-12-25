import { useState } from 'react'
import { toast } from 'react-toastify'
import {  FaUser } from 'react-icons/fa'
import {useDispatch, useSelector} from 'react-redux'
import './Register.css'
import { register, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
const Register = ({setRegister}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError1, isSuccess, message } = useSelector(
        (state) => state.auth
      )
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: 'Male',
        company: '',
        password: '',
        passowrd2: ''
    })
    const {name, email , gender, company , password, passowrd2 } = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
             [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if(password !== passowrd2){
            toast.error('Password do not match')
        }else {
            const userData = {
                name,
                email,
                gender,
                company,
                password
            }
            dispatch(register(userData))
            setRegister(false)
            if(isSuccess || user) {
                navigate('/campaign')
            }
            if(isError1){
                navigate('/')
                dispatch(reset())
            }
        }
    }
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
            <div className='loginPopUp d-flex justify-content-center flex-column align-items-center'>
                    <h1>
                        <div className="shadow d-flex align-items-center">
                        <div className='mx-1'>
                        <FaUser />
                        </div><div className='mx-1'> Register
                        </div>
                        </div>
                    </h1>
                    <h4 className='mt-2 text-light'><b>Create Account To Access Compaign List</b></h4>
                </div>
                <form onSubmit={onSubmit} className='mt-2'>
                    <div onClick={() => setRegister(false)} className='close'>&#x2716;</div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Name:</label>
                        <input type="text" name='name' onChange={onChange} value={name} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Email:</label>
                        <input type="email" name='email' onChange={onChange} value={email} className="form-control" />
                    </div>
                    <div className='form-group d-flex justify-content-between my-2 align-items-center'>
                    <div className="form-group flex-grow-0 mr-5">
                    <label for="recipient-name" className="col-form-label">Gender:</label>
                    <select className="form-select" name='gender'  onChange={onChange} value={gender} aria-label="Default select example">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    </div>
                    <div className="form-group  flex-grow-1">
                        <label for="recipient-name" className="col-form-label">Company Name:</label>
                        <input type="text" name='company' onChange={onChange} value={company} className="form-control" />
                    </div>
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Password:</label>
                        <input type="password" name='password' onChange={onChange} value={password} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Confirm Password:</label>
                        <input type="password" name='passowrd2' onChange={onChange} value={passowrd2}  className="form-control" />
                    </div>
                    <button type='submit' className='floatBtn btn btn-primary mt-3 text-align-right'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register