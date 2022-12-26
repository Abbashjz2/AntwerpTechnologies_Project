import {Line, Bar, Pie} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import './Dashboard.css'
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { TOKEN } from '../../CustomRequest';
import Chart from '../Chart/Chart';
import axios from 'axios';

const Dashboard = ({chartData}) => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    let config = { 
      headers: {
        'Authorization': 'Bearer ' + TOKEN  
      }
    }
        const getStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaign/stats", config);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Campain Per Month": item.total },
          ])
        );
      } catch(err) {
        console.log(err)
      }
    };
    getStats();
  },[MONTHS])
  return (
<>
<div className='d-flex flex-nowrap mb-5 colcolumn align-items-center'>

<Bar data={chartData} className='canvasLineChart w-lg-50 p-2 w-sm-100 w-md-75 col-xxl-6 w-xsm-100'/>

<div className="mx-2 chart w-lg-50 w-md-75 mt-20 w-sm-100 w-xsm-100">
      <Chart
        data={userStats}
        title="Campaign Analytics"
        grid
        dataKey="Campain Per Month"
        />
    </div>
</div>
<div className='d-flex mt-5 colcolumn align-items-center'>
  <Line data={chartData} className='w-lg-50 w-md-75 h-100 w-sm-100 w-xsm-100'/>
  <div className='d-flex w-100 justify-content-center mt-50 '>
  <Pie data={chartData}  className='w-lg-50 w-md-50 h-100 align-self-center w-sm-75  w-xsm-75'/>
  </div>
</div>
        </>

  )
}

export default Dashboard