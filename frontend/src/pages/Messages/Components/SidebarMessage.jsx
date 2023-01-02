import { useState } from 'react'
import { useEffect } from 'react'
import EachContactSideBar from './EachContactSideBar'

const SidebarMessage = ({allUsers,user}) => {
const [usersExceptMe, setUsersExceptMe] = useState([])
const [removeDuplicate, setRemoveDuplicate] = useState([])
useEffect(() => {

  allUsers.map((users) => {
    if(users._id !== user._id){
      removeDuplicate.push(users)
    }
    setUsersExceptMe([...new Set(removeDuplicate)])
  })
},[])
  
  return (
    <div className="col-12 col-lg-5 col-xl-3 border-right">

    <div className="px-4 d-none d-md-block">
      <div className="d-flex align-items-center">
        <div className="flex-grow-1">
          <input type="text" className="form-control my-3" placeholder="Search..."/>
        </div>
      </div>
    </div>
      {
        usersExceptMe.map((user) => (
            <EachContactSideBar user={user} />
        ))
      }
    <hr className="d-block d-lg-none mt-1 mb-0"/>
  </div>
  )
}

export default SidebarMessage