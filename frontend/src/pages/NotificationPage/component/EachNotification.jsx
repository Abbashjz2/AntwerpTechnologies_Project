import React from 'react'

const EachNotification = ({notification}) => {
    return (
        <div className='notification'>
            You are mentioned in a campaign, that's ID: {notification.id} and name: {notification.name}
        </div>
    )
}

export default EachNotification