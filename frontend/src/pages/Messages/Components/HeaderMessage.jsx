import React, { useEffect, useState } from 'react'
import { BiMessageAltAdd } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HeaderMessage = ({ user,campaigns }) => {
	const { allUsers,switchInbox} = useSelector((state) => state.auth)
	const [colleagueName, setColleagueName] = useState('')
	const [userOwned, setUserOwned] = useState()
  const [colleagueImage, setColleagueImage] = useState('')
  const collectColleagueImage = () => {
    const index = allUsers.findIndex((user) => user._id === switchInbox)
	setColleagueName(allUsers[index]?.name)
	setUserOwned(allUsers[index])
    const file = allUsers[index]?.file
    if(file){
      let api = "api\\"
      const pathes = file.filePath.replace(api, '')
      setColleagueImage(`http://localhost:5000/${pathes}`)
    }else {
      setColleagueImage("https://bootdey.com/img/Content/avatar/avatar1.png")
    }
  }
    useEffect(() => {
        collectColleagueImage()

    }, [switchInbox])
	return (
		<div className="py-2 px-4 border-bottom d-none d-lg-block">
			<div className="d-flex align-items-center py-1">
				<div className="position-relative">
					<Link to={`/userinfo/${switchInbox}`} state={{userOwned,campaigns,allUsers}}><img src={colleagueImage} className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" /></Link>
				</div>
				<div className="flex-grow-1 pl-3" style={{ fontSize: "16px" }}>
					<strong><b>{colleagueName}</b></strong>
				</div>
				<div>
					<button className="btn btn-primary btn-lg mr-1 px-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-phone feather-lg"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></button>
					<button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-video feather-lg"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg></button>
					<button className="btn btn-light border btn-lg px-3"><BiMessageAltAdd style={{ fontSize: "30px" }} /></button>
				</div>
			</div>
		</div>
	)
}

export default HeaderMessage