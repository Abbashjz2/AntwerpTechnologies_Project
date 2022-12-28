
import {  format, formatDistance, subDays } from 'date-fns'
import Logo from './img_avatar.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './UserPorfile.css'
import { GrView } from 'react-icons/gr'
import { BiHide } from 'react-icons/bi'
import { toast } from 'react-toastify'

const UserPorfile = () => {
  const location = useLocation()
  const params = useParams()
  const [user, setUser] = useState(location.state.userOwned)
  const [allUsers, setallUsers] = useState(location.state.allUsers)
  const [allCampaigns] = useState(location.state.campaigns)
  const [mentionedCampaign, setMentionedCampaign] = useState([])
  const [allCampaignPerUser, setAllCampaignPerUser] = useState([])
  const [removeDuplicate, setRemoveDuplicate] = useState([])
  const [removeDuplicate2, setRemoveDuplicate2] = useState([])
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
      const getUserCampaign = () => {
        location.state.campaigns.map((campaign) => {
          if(campaign.user.toString() === user._id.toString()){
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
                      <h5 className="f-w-600">{user?.name}</h5>
                      <p className=''>Web Designer</p>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Email</p>
                          <h6 className="text-muted f-w-400">{user?.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Gender</p>
                          <h6 className="text-muted f-w-400">{user?.gender}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Comapny</p>
                          <h6 className="text-muted f-w-400">{user?.company}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Created In</p>
                          <h6 className="text-muted f-w-400">{user && format(new Date(user?.createdAt), 'MM/dd/yyyy')}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Campaign</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Campaign:</p>
                          <h6 className="text-muted f-w-400">{allCampaignPerUser.length} campaigns 
                          {allCampaignPerUser.length > 0 ? <Link to={`/user-campaign/${user._id}`} state={{allCampaignPerUser,user,allUsers}}><GrView className='viewIcon'/></Link> 
                          :
                          <BiHide className='viewIcon' onClick={() => toast.warning('User don\'t have any campaign to see it')}/> 
                        }
                          </h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Mentioned Campaign:</p>
                          <h6 className="text-muted f-w-400">{mentionedCampaign.length} campaigns 
                          {mentionedCampaign.length > 0 ? <Link to={`/user-campaign/${user._id}`} state={{mentionedCampaign,user,allUsers}}><GrView className='viewIcon'/></Link> 
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