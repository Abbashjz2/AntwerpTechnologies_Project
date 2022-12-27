import { useState } from 'react'
import './AddCampaign.css'
import Logo from './antwerp-technologie-logo-01-2.png'
import { useSelector, useDispatch } from 'react-redux'
import { createCampaign } from '../../features/campaigns/campaignSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const AddCampaign = () => {
    const [exceptCurrent, setExceptCurrent] =useState([])
    const dispatch = useDispatch()
    const { allUsers, user } = useSelector(
        (state) => state.auth
    )
    const { isError, message, isSuccess } = useSelector(
        (state) => state.campaigns
    )
    useEffect(() => {
        if(isError && !isSuccess && message) {
            toast.error(message)
        }
        if(isSuccess && !isError && message) {
            toast.success('User Added Successfully')
            setAdd(false)

        }

    },[dispatch,isError,isSuccess,message])
    const getAllUsersExceptCurrent = () => {
        allUsers.map((users) => {
            if(users._id !== user._id){
                exceptCurrent.push(users)
            }
        })
    }
    const [users, setUsers] = useState([])
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    
    const [add, setAdd] = useState(false)
    const [usersToAdd, setUsersToAdd] = useState([])
    const addUser = (e) => {
        if (users.includes(e.target.value)) {
            console.log("exist")
        } else {
            allUsers.map((user) => {
                if (user.name === e.target.value) {
                    setUsers([...users, user.name])
                    setUsersToAdd([...usersToAdd, user._id])
                }
            })
        }
    }
    const addNew =() => {
        setAdd(true)
        getAllUsersExceptCurrent()
    }
    const removeUser = (user) => {
        const newUser = users.filter((item) => item.toString() !== user.toString())
        const indexofUser = allUsers.findIndex((item) => item.name === user)
        const idOfUser = allUsers[indexofUser]._id
        console.log(idOfUser)
        console.log(usersToAdd);
        const newUser1 = usersToAdd.filter((item) => item.toString() !== idOfUser.toString())
        setUsers(newUser)
        setUsersToAdd(newUser1)

    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (users.length < 5) {
            toast.error('Minimuim Users Should be 5')
        }
        else {
            const sendData = {
                id,
                name,
                type,
                isClonned: false, 
                user: user._id,
                users: usersToAdd
            }
            dispatch(createCampaign(sendData))
        }
    }
    return (
        <div>
            <button className='btn btn-primary rounded' onClick={addNew}>Add New Campaign</button>
            {add && <div id="myModal" className="modal">
                <div className="modal-content w-45">
                    <div className='loginPopUp d-flex justify-content-center flex-column align-items-center'>
                        <h1>
                            <div className="d-flex align-items-center m-2">
                                <img src={Logo} width={150} alt='' />
                            </div>
                        </h1>
                        <h3 className='text-light'><b>Create new Campaign</b></h3>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className='close' onClick={() => setAdd(false)}>&#x2716;</div>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">ID:<span>*</span></label>
                            <input type="number" name='id' required value={id} onChange={(e) => setId(e.target.value)} min="1" max="99999" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Name:<span>*</span></label>
                            <input type="text" name='description' required value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                        </div>
                        <div className='d-flex mt-2 mb-3'>
                            <div className="form-group sorting">
                                <label for="recipient-name" className="col-form-label">Type:<span>*</span></label>
                                <select className="form-select" required onChange={(e) => setType(e.target.value)}>
                                    <option selected disabled>Choose Campaign Type</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Educational">Educational</option>
                                    <option value="Governmental">Governmental</option>
                                </select>
                            </div>
                            <div className="form-group ml-2 sorting">
                                <label for="users" className="col-form-label">Users:<span>*</span></label>
                                <select className="form-select" required name='users' onChange={addUser}>
                                    <option selected disabled>Select Users</option>
                                    {exceptCurrent.map((user) => (
                                        <option id={user._id} value={[user.name]}>{user.email}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='main'>
                            <div className='allUsers'>
                                <div className='putusers'>
                                    <div className='setusers'>
                                        {users.map((userr) => (
                                            <div className='userContent d-flex align-items-center'>
                                                <div className=''>{userr}</div>
                                                <div className='removeUser' onClick={() => removeUser(userr)}>X</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button type='submit' name='name' className='btn btn-primary text-center mx-1 mt-2'>Create Campaign</button>
                        </div>
                    </form>
                </div>
            </div >
            }
        </div >

    )
}

export default AddCampaign