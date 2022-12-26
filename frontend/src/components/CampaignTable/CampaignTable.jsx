
import { useState } from 'react'
import './CampaignTable.css'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import TableRaw from '../TableRaw/TableRaw';
import { format, getUnixTime } from 'date-fns'
import Pagination from '../Pagination/Pagination';
import AddCampaign from '../AddCampaign/AddCampaign';
import { useSelector } from 'react-redux';
const CampaignTable = () => {
  const { campaigns } = useSelector(
    (state) => state.campaigns
)
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
  const [searchCampaign, setSearchCampaign] = useState("");
  const [data, setData] = useState(campaigns)
  const [currentPage, setCurrentPage] = useState(1);
  const [campaignPerPage, setCampaignPerPage] = useState(25);
  const indexOfLastCampaign = currentPage * campaignPerPage;
  const indexOfFirstCampaign = indexOfLastCampaign - campaignPerPage;
  const currentCampaigns = data.slice(indexOfFirstCampaign, indexOfLastCampaign);
  
  const [filterType, setFilterType] = useState(campaigns)

  const sortById = () => {
    const dataCopy = [...data];
    dataCopy.sort((campaignA, campaignB) => {
      if (sorted.reversed) {
        return campaignA.id - campaignB.id;
      }
      return campaignB.id - campaignA.id;
    });
    setData(dataCopy);
    setSorted({ sorted: "id", reversed: !sorted.reversed });
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp style={{ color: '#0099ff' }} />;
    }
    return <FaArrowDown style={{ color: '#0099ff' }} />;
  };
  const search = (e) => {
    const matchedCampaign = filterType.filter((campaign) => {
      return campaign.name.toLowerCase().includes(e.target.value.toLowerCase()) || campaign.type.toLowerCase().includes(e.target.value.toLowerCase()) ;
    });
    setSearchCampaign(e.target.value);
    setData(matchedCampaign);
  };
  
  const sortByDate = () => {
    const dataCopy = [...data];
    dataCopy.sort((campaignA, campaignB) => {
      if (sorted.reversed) {
        let yearsA = (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[2]
        let monthA =  (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[1]
        let dayA = (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[0]
        let yearsB = (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[2]
        let monthB =  (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[1]
        let dayB = (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[0]
        if(getUnixTime(new Date(yearsA, monthA, dayA)) > getUnixTime(new Date(yearsB, monthB, dayB))){
          return 1
        }
        return -1;
      }else {
        let yearsA = (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[2]
        let monthA =  (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[1]
        let dayA = (format(new Date(campaignA.createdAt), 'MM/dd/yyyy')).split('/')[0]
        let yearsB = (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[2]
        let monthB =  (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[1]
        let dayB = (format(new Date(campaignB.createdAt), 'MM/dd/yyyy')).split('/')[0]
        if(getUnixTime(new Date(yearsA, monthA, dayA)) > getUnixTime(new Date(yearsB, monthB, dayB))){
          return -1
        }
        return 1;
      }
      
    });
    setData(dataCopy);
    setSorted({ sorted: "date", reversed: !sorted.reversed });
  };

  const sortType = (e) => {
    if (e.target.value === 'All') {
      setData(campaigns)
      setFilterType(campaigns)
    }
    else{
      const matchedCampaign = campaigns.filter((campaign) => {
        return campaign.type.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setData(matchedCampaign);
      setFilterType(matchedCampaign)
    }
  }
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <input className="form-control me-2 w-50" type="text" placeholder="Search" onChange={search} value={searchCampaign} />
        <select className="form-select w-25" aria-label="Default select example" onChange={sortType}>
          <option defaultValue disabled >Choose Type</option>
          <option value="All" >All</option>
          <option value="Marketing">Marketing</option>
          <option value="Educational">Educational</option>
          <option value="Governmental">Governmental</option>
        </select>
        <select className="form-select itemPerPage mx-2" onChange={(e)=> setCampaignPerPage(e.target.value)}>
          <option defaultValue value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <AddCampaign key={0}/>
      </div>
      <table className="table table-striped mt-3 tableScale">
        <thead>
          <tr>
            <th scope='col' onClick={sortById}><div style={{ cursor: 'pointer', maxWidth: 'max-content' }}><span style={{ marginRight: 10 }}>Id</span>{sorted.sorted === "id" ? renderArrow() : null}</div></th>
            <th scope='col' >Campaign Name</th>
            <th scope='col'>Users</th>
            <th scope='col'>Type</th>
            <th scope='col' onClick={sortByDate}><div style={{ cursor: 'pointer' }}><span style={{ marginRight: 10 }}>Date</span> {sorted.sorted === "date" ? renderArrow() : null}</div></th>
            <th scope='col'>Clone</th>
            <th scope='col'>Delete</th>
            <th scope='col'>Info</th>
          </tr>
        </thead>
        <tbody>
          {currentCampaigns.map((item,index) => (
            <TableRaw key={index} data={item}/>
          ))}
        </tbody>
      </table>
      <Pagination key={1} campaignPerPage={campaignPerPage} totalPosts={data.length} paginate={paginate} />
    </div>
  )
}

export default CampaignTable