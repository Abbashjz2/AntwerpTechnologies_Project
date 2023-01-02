import { format } from 'date-fns'
import './Profile.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateUser } from '../../features/auth/authSlice'
import Header from '../../components/Header/Header'

const Profile = () => {

    const { user} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [isShow, setIsShow] = useState(false)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [gender, setGender] = useState(user?.gender)
    const [company, setCompany] = useState(user?.company)
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [uploadImage, setUploadImage] = useState()
    
    const [imagePath, setImagePath] = useState(user?.file)
    const SingleFileChange = (e) => {
        setUploadImage(e.target.files[0]);
        console.log("object");
    }

    const updateImage = () => {
        if (user.file) {
            let api = "api\\"

            const pathes = user?.file?.filePath?.replace(api, '')
            setImagePath(pathes)
        }
        else {
            setImagePath(null)
        }
    }
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        updateImage()
    })

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('gender', gender)
        formData.append('company', company)
        formData.append('password', password)
        formData.append('file', uploadImage)

        const userData = {
            id: user._id,
            data: formData
        }
        dispatch(updateUser(userData))
        setIsEdit(false)
        setPassword('')
        setPassword2('')
        setUploadImage()

    }
    return (
        <>
            <Header />
            <div className="row gutters-sm mt-4 mx-5">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <div className="avatar-upload">
                                
                                    <div className="avatar-preview">
                                        <div id="imagePreview">
                                            <img className="imagePreview" src = {`http://localhost:5000/${imagePath}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h4>{user.name}</h4>
                                    <p className="text-secondary mb-1">Full Stack Developer</p>
                                    <p className="text-muted font-size-sm">{user.email}</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Full Name</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {user.name}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Email</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {user.email}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Gender</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {user.gender}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Mobile</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {user.company}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <h6 className="mb-0">Created At</h6>
                                </div>
                                <div className="col-sm-9 text-secondary">
                                    {format(new Date(user.createdAt), 'MM/dd/yyyy')}
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-12">
                                    <button onClick={() => setIsEdit(true)} className="btn btn-warning">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEdit &&
                <div id="myModal" className="modal">
                    <div className="modal-content bg-light">
                        <div className='mx-5 p-2  rounded'>
                            <div onClick={() => setIsEdit(false)} className='close'>&#x2716;</div>
                            <form className='' onSubmit={(e)=> onSubmit(e)}>
                                <div className="form-group">
                                    <label for="recipient-name" className="col-form-label">Name:</label>
                                    <input type="text" required name='name' onChange={(e) => setName(e.target.value)} value={name} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="recipient-name" className="col-form-label">Email:</label>
                                    <input type="email" required name='email' onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" />
                                </div>
                                <div className='form-group d-flex justify-content-between my-2 align-items-center'>
                                    <div className="form-group flex-grow-0 mr-5">
                                        <label for="recipient-name" className="col-form-label">Gender:</label>
                                        <select className="form-select" required name='gender' onChange={(e) => setGender(e.target.value)} value={gender} aria-label="Default select example">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div className="form-group  flex-grow-1">
                                        <label for="recipient-name" className="col-form-label">Company Name:</label>
                                        <input type="text" required name='company' onChange={(e) => setCompany(e.target.value)} value={company} className="form-control" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="recipient-name" className="col-form-label">Password:</label>
                                    <div className="d-flex">
                                        <input type={isShow ? "text" : "password"} required name='password' onChange={(e) => setPassword(e.target.value)} value={password} className="form-control" />
                                        <span className="showHide btn" onClick={() => setIsShow(!isShow)}>{isShow ? 'Hide' : "Show"}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label for="recipient-name" className="col-form-label">Confirm Password:</label>
                                    <input type={isShow ? "text" : "password"} required name='passowrd2' onChange={(e) => setPassword2(e.target.value)} value={password2} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label for="recipient-name" className="col-form-label">Image:</label>
                                    <input type="file" className="form-control" onChange={(e) => SingleFileChange(e)} />
                                </div>
                                <div className="form-group">
                                    <button type='submit' className='floatBtn btn btn-primary mt-3 text-align-right'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>


    )
}

export default Profile