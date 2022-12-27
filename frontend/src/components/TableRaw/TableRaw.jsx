import { GrClone } from 'react-icons/gr'
import { FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { createCampaign, deleteCampaign, updateCampaign } from '../../features/campaigns/campaignSlice'
import {GrContactInfo} from 'react-icons/gr'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import './TableRaw.css'
import { Link } from 'react-router-dom'

const TableRaw = ({ data }) => {
    const { user, allUsers } = useSelector(
        (state) => state.auth
    )
    const { campaigns } = useSelector(
        (state) => state.campaigns
    )
    const dispatch = useDispatch()
    const strClone = 'COPY of '
    const cloneItem = () => {
        const itemCloned = {
            id: Math.floor(Math.random() * 10000) + 1,
            name: strClone.concat(data.name),
            user: user,
            type: data.type,
            users: data.users,
            isClonned: true
        }
        const newItem = {
            id: data.id,
            name: data.name,
            user: data.user,
            type: data.type,
            users: data.users,
            isClonned: true
        }
        const itemTosend = {
            id: data._id,
            newItem
        }
        dispatch(updateCampaign(itemTosend))

        setTimeout(() => {
            dispatch(createCampaign(itemCloned))
        }, 1000);
    }
    const cloneClonned = () => {
        if(data.name.includes('COPY of')){
            toast.error('You cannot clone a clonned Campaign')
        }else {

            toast.error('Item Already Clonned')
        }
    }

    return (
        <tr>

            <th scope='row'>{data.id}</th>
            <td>{data.name}</td>
            <td>{data.users.map((item) => <div>{item}</div>)}</td>
            <td>{data.type}</td>
            <td>{format(new Date(data.createdAt), 'MM/dd/yyyy')}</td>
            {data.isClonned ? <td><GrClone className='clonnedItem tableIcon' onClick={cloneClonned} /></td> : <td ><GrClone className='tableIcon1' onClick={cloneItem} /></td>}
            {
                user._id.toString() === data.user.toString() ? 
                <td ><FiTrash onClick={() => dispatch(deleteCampaign(data._id))} className='tableIcon' /></td> 
                : 
                <td ><FiTrash onClick={() => toast.error('This is not your campaign')} className='tableIcon clonnedItem' /></td>
            }
            <td>
            <Link to= {`/singlecampagin/${data._id}`}  state={{campaigns,allUsers}} ><GrContactInfo style={{fontSize:'25px',}} className='tableIcon'/></Link>
            </td>
        </tr>
    )
}

export default TableRaw