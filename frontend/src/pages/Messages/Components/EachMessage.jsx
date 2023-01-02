import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const EachMessage = ({ message, user }) => {
  const { allUsers,switchInbox} = useSelector((state) => state.auth)
  const [myImage, setmyImage] = useState(user?.file)
  const [colleagueImage, setColleagueImage] = useState('')
  const updateImage = () => {
      if (user?.file) {
          let api = "api\\"
          const pathes = user?.file?.filePath?.replace(api, '')
          setmyImage(`http://localhost:5000/${pathes}`)
      }else{
        setmyImage("https://bootdey.com/img/Content/avatar/avatar1.png")
      }
  }
  const collectColleagueImage = () => {
    const index = allUsers.findIndex((user) => user._id === switchInbox)
    const file = allUsers[index]?.file
    if(file){
      let api = "api\\"
      const pathes = file?.filePath?.replace(api, '')
      setColleagueImage(`http://localhost:5000/${pathes}`)
    }else {
      setColleagueImage("https://bootdey.com/img/Content/avatar/avatar1.png")
    }
  }
  useEffect(() => {  
      updateImage() 
      
      collectColleagueImage()
  }, [])
  return (
    <div className={message.sender === user._id ? "chat-message-left pb-4" : "chat-message-right pb-4"} >
      <div>
        <img src={message.sender === user._id ? myImage : colleagueImage} className="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
        <div className="text-muted small text-nowrap mt-2">2:33 am</div>
      </div>
      <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
        {message.content}
      </div>
    </div>
  )
}

export default EachMessage