import { format } from 'date-fns'
import React from 'react'
import { GrContactInfo } from 'react-icons/gr'
import { Link } from 'react-router-dom'

const UserCampaignRow = ({ campaign, allUsers, allCampaignPerUser,mentionedCampaign }) => {
    const campaigns = allCampaignPerUser || mentionedCampaign

    return (
        <tr>
            <th scope='row'>{campaign.id}</th>
            <td>{campaign.name}</td>
            <td>{campaign.users.map((item) => <div>{item}</div>)}</td>
            <td>{campaign.type}</td>
            <td>{format(new Date(campaign.createdAt), 'MM/dd/yyyy')}</td>
            <td><Link to={`/singlecampagin/${campaign._id}`} state={{ allUsers, campaigns }}  ><GrContactInfo style={{ fontSize: '25px', }} className='tableIcon' /></Link></td>
        </tr>
    )
}

export default UserCampaignRow