import ReactFileReader from 'react-file-reader';
import {  useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import profile_Picture from './360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
import { useDispatch, useSelector } from 'react-redux'
import './Register.css'
import { register, reset } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
const Register = ({ setRegister }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError1, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
       });
    const SingleFileChange = (e) => {   
        setUploadImage(e.target.files[0]);
        setuserInfo({
            ...userInfo,
            file:e.target.files[0],
            filepreview:URL.createObjectURL(e.target.files[0]),
          });
    }
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('Male')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [uploadImage, setUploadImage] = useState(null)  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: 'Male',
        company: '',
        password: '',
        passowrd2: ''
    })

    const inputFile = useRef(null)
    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error('Password do not match')
        } else {
            const formData = new FormData();
            formData.append('name', name)
            formData.append('email', email)
            formData.append('gender', gender)
            formData.append('company', company)
            formData.append('password', password)
            formData.append('file', uploadImage)
            dispatch(register(formData))
            setRegister(false)
            if (isSuccess || user) {
                navigate('/campaign')
            }    
            if (isError1) {
                navigate('/')
                dispatch(reset())
            }  
        }
    }
    const onButtonClick = () => {
        inputFile.current.click();
    };
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
                    
                <div className='custom' id="read_url" type="file" onClick={onButtonClick} onChange={(e) => SingleFileChange(e)}>
                            <img src={userInfo.filepreview ? userInfo.filepreview : profile_Picture} alt="" className='img-thumb'/>
                            <span className='uploadTag'>Upload</span>
                            <input type='file' id='file' ref={inputFile} style={{ display: 'none' }} />
                    </div>
                    <div onClick={() => setRegister(false)} className='close'>&#x2716;</div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Name:</label>
                        <input type="text" name='name' onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Email:</label>
                        <input type="email" name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                    </div>
                    <div className='form-group d-flex justify-content-between my-2 align-items-center'>
                        <div className="form-group flex-grow-0 mr-5">
                            <label for="recipient-name" className="col-form-label">Gender:</label>
                            <select className="form-select" name='gender' onChange={(e) => setGender(e.target.value)} value={gender} aria-label="Default select example">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="form-group  flex-grow-1">
                            <label for="recipient-name" className="col-form-label">Company Name:</label>
                            <input type="text" name='company' onChange={(e) => setCompany(e.target.value)} value={company} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Password:</label>
                        <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Confirm Password:</label>
                        <input type="password" name='passowrd2' onChange={(e) => setPassword2(e.target.value)} value={password2} className="form-control" />
                    </div>
                    <button type='submit' className='floatBtn btn btn-primary mt-3 text-align-right'>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Register