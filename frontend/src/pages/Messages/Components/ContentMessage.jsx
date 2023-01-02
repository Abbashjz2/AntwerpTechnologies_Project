import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../components/Spinner/Spinners'
import { getFromSocket, sendMessage } from '../../../features/auth/authSlice'
import EachMessage from './EachMessage'
import SendMessage from './SendMessage'

const ContentMessage = ({user,socket }) => {
  const dispatch = useDispatch()
	const { userInbox ,switchInbox, isSuccess, isError,isLoading, message} = useSelector((state) => state.auth)
  const [messageForThisUser, setMessageForThisUser] = useState([])
  const [removeDuplicate, setRemoveDuplicate] = useState([])
  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-recieve", (msg) => { 
        dispatch(getFromSocket(msg)) 
        console.log(msg)
      }); 
    }
},[socket]) 
  useEffect(() => {
    const getUserInbox = () => {
      userInbox?.map((message) => { 
        if(message?.sendTo?.toString() === switchInbox.toString() || message?.sender?.toString() === switchInbox.toString()){
          if(removeDuplicate.includes(message)){
          }else {
            removeDuplicate.push(message)
          }
        } 
      })  
      setMessageForThisUser([...new Set(removeDuplicate)])  
      setRemoveDuplicate([])
    }

    getUserInbox() 
    getUserInbox() 

  },[switchInbox,isSuccess, isError, message, userInbox,socket.current]) 
  

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div>
      <div className="position-relative">
        <div className="chat-messages p-4">
           <>
              {messageForThisUser.map((message) => (
                <EachMessage message={message} user={user}/>
              ))}
            
            </> 
            {/* <div className="chat-message-left pb-4">
              <div>
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                <div className="text-muted small text-nowrap mt-2">2:34 am</div>
              </div>
              <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                Sit meis deleniti eu, pri vidit meliore docendi ut, an eum erat animal commodo.
              </div>
            </div> */}
            <SendMessage socket={socket} />
        </div>
      </div>

      
    </div>
  )
}

export default ContentMessage