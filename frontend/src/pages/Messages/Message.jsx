import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import Header from '../../components/Header/Header'
import { getMessages, getUsers } from '../../features/auth/authSlice'
import ContentMessage from './Components/ContentMessage'
import HedearMessage from './Components/HeaderMessage'
import SidebarMessage from './Components/SidebarMessage'
import './Message.css'
import io from "socket.io-client";
const Message = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const socket = useRef();
	const { allUsers, user,campaigns } = location.state
	useEffect(() => {
		if (user) {  
			socket.current = io("http://localhost:5000"); 
			socket.current.emit("add-user", user._id);
		  }
		dispatch(getMessages(user._id))
		dispatch(getUsers())
	},[dispatch,user])
	return (
		<>
			<Header />
			<main className="content">
				<div className="container p-0">

					<h1 className="h3 mb-3">Messages</h1>

					<div className="card">
						<div className="row g-0">
							<SidebarMessage allUsers={allUsers} user={user} />
							<div className="col-12 col-lg-7 col-xl-9">
								<HedearMessage user={user} campaigns={campaigns}/>
								<ContentMessage  user={user} socket={socket}/>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}

export default Message