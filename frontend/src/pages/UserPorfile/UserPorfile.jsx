import axios from 'axios'
import {  formatDistance, subDays } from 'date-fns'
import Logo from './img_avatar.png'
import { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import './UserPorfile.css'

const UserPorfile = () => {
  const location = useLocation()
  const params = useParams()
  const [user, setUser] = useState(location.state)
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
                      <h5 className="f-w-600">{user.name}</h5>
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
                          <h6 className="text-muted f-w-400">{user.email}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Gender</p>
                          <h6 className="text-muted f-w-400">{user.gender}</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Projects</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Comapny</p>
                          <h6 className="text-muted f-w-400">{user.company}</h6>
                        </div>
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Campaigns</p>
                          <h6 className="text-muted f-w-400">{formatDistance(subDays(new Date(user.createdAt), 3), new Date(user.createdAt), { addSuffix: true })}</h6>
                        </div>
                      </div>
                      <ul className="social-link list-unstyled m-t-40 m-b-10">
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                        <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                      </ul>
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