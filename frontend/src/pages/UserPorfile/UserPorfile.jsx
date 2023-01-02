
import {  format } from 'date-fns'
import Logo from './img_avatar.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './UserPorfile.css'
import { GrView } from 'react-icons/gr'
import { BiHide } from 'react-icons/bi'
import { toast } from 'react-toastify'
import {MdOutlineMessage} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { goToInbox } from '../../features/auth/authSlice'
const UserPorfile = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation()
  const dispatch = useDispatch()
  const params = useParams()
  const [user1, setUser] = useState(location.state.userOwned)
  const [allUsers, setallUsers] = useState(location.state.allUsers)
  const [allCampaigns] = useState(location.state.campaigns)
  const [campaigns] = useState(location.state.campaigns)
  const [mentionedCampaign, setMentionedCampaign] = useState([])
  const [allCampaignPerUser, setAllCampaignPerUser] = useState([])
  const [removeDuplicate, setRemoveDuplicate] = useState([])
  const [removeDuplicate2, setRemoveDuplicate2] = useState([])
  const [imagePath, setImagePath] = useState(user1?.file)
  const updateImage = () => {
      if (user1?.file) {
          let api = "api\\"
          const pathes = user1?.file?.filePath.replace(api, '')
          setImagePath(pathes)
      }
  }
  useEffect(() => {
      updateImage()
      const getUserCampaign = () => {
        location.state.campaigns.map((campaign) => {
          if(campaign.user.toString() === user1._id.toString()){
            removeDuplicate.push(campaign)
          }     
        })
        setAllCampaignPerUser([...new Set(removeDuplicate)])
      } 
      const getMentioneCampaign = () => {
        allCampaigns.map((campaign) => {
          campaign.users.map((user) => {
            if(user.toString() === location.state.userOwned._id.toString()){
              removeDuplicate2.push(campaign)
            }
          })
        })
        setMentionedCampaign([...new Set(removeDuplicate2)])
      }
      getMentioneCampaign()
      getUserCampaign()
  },[])
  const goInbox = () => {
    dispatch(goToInbox(user1._id))
  }
  return (
    <div>
      <Header />
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white d-flex align-items-center flex-column">
                      <div className="m-b-25 imageProfile">
                        <img src= { imagePath ? `http://localhost:5000/${imagePath}` : Logo} className="img-radius" alt="User-Profile-Image" />
                      </div>
                      <h5 className="f-w-600">{user1?.name}</h5>
                      <p className=''>Web Designer</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <div className="unsetLink d-flex w-100 justify-content-between">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600 w-100">Information</h6>
                      <Link onClick={goInbox} to='/inbox' state={{user,campaigns,allUsers}}> <MdOutlineMessage className='inboxIcon'/></Link>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user1?.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Gender</p>
                          <h6 className="text-muted f-w-400">{user1?.gender}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Comapny</p>
                          <h6 className="text-muted f-w-400">{user1?.company}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Created In</p>
                          <h6 className="text-muted f-w-400">{user1 && format(new Date(user1?.createdAt), 'MM/dd/yyyy')}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Campaign</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Campaign:</p>
                          <h6 className="text-muted f-w-400">{allCampaignPerUser.length} campaigns 
                          {allCampaignPerUser.length > 0 ? <Link to={`/user-campaign/${user1._id}`} state={{allCampaignPerUser,user1,allUsers}}><GrView className='viewIcon'/></Link> 
                          :
                          <BiHide className='viewIcon' onClick={() => toast.warning('User don\'t have any campaign to see it')}/> 
                        }
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Mentioned Campaign:</p>
                          <h6 className="text-muted f-w-400">{mentionedCampaign.length} campaigns 
                          {mentionedCampaign.length > 0 ? <Link to={`/user-campaign/${user1._id}`} state={{mentionedCampaign,user1,allUsers}}><GrView className='viewIcon'/></Link> 
                          :
                          <BiHide className='viewIcon' onClick={() => toast.warning('User don\'t have any campaign to see it')}/> 
                        }
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPorfile