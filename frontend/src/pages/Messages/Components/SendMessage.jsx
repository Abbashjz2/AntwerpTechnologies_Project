import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMessages, sendMessage } from '../../../features/auth/authSlice'

const SendMessage = ({socket}) => {
    const { userInbox,switchInbox,user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
    const [msg, setMsg] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()
        const sendData = {  
          sender: user._id, 
          content: msg,
          sendTo: switchInbox
        }
        dispatch(sendMessage(sendData)) 
        // dispatch(getMessages(user._id))
        setMsg('') 
        socket.current.emit("send-msg", {
          sender: user._id, 
          content: msg,
          sendTo: switchInbox
        });
      }
  return (
    <form onSubmit={onSubmit} className="flex-grow-0 py-3 px-4 border-top">
        <div className="input-group">
          <input onChange={(e) => setMsg(e.target.value)} type="text" className="form-control" value={msg} placeholder="Type your message" />
          <button type='submit' className="btn btn-primary">Send</button>
        </div>
      </form>
  )
}

export default SendMessage