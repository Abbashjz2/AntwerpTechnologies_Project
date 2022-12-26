import { useState } from "react";
import './Tab.css'
import { MdCampaign, MdDashboard } from 'react-icons/md'
import CampaignTable from '../CampaignTable/CampaignTable'
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../features/auth/authSlice";
import { getCmapaigns } from "../../features/campaigns/campaignSlice";
import Spinner from "../Spinner/Spinners";

function Tabz() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const typeBar = [{ type: 'Marketing', qty: 0 }, { type: 'Educational', qty: 0 }, { type: 'Governmental', qty: "0" }]
    const { isError, message, campaigns, isLoading } = useSelector(
        (state) => state.campaigns
    )
    const [num1, setNum1] = useState('')
    const [num2, setNum2] = useState('')
    const [num3, setNum3] = useState('')

    const evaluate = () => {
        let inc = 0;
        let inc1 = 0;
        let inc2 = 0;
       campaigns.map((item) => {
            if (item.type === 'Marketing') {
                inc++;
                setNum1(inc.toString())
            }
            else if (item.type === 'Educational') {
                inc1++
                setNum2(inc1.toString())
            }
            else {
                inc2++
                setNum3(inc2.toString())
            }
        })
    }
    const userData = {
        labels: typeBar.map((data) => data.type),
        datasets: [
            {
                label: "Campaign Types",
                data: [num1, num2, num3],
                backgroundColor: [
                    "#0099ff",
                    "rgba(75,192,192,1)",
                    "#f3ba2f",
                  ],
                  borderColor: "black",
                  borderWidth: 3,
            }]
    }
    const [toggleState, setToggleState] = useState(1);
    const { user } = useSelector((state) => state.auth)
    const toggleTab = (index) => {
        setToggleState(index);
        evaluate()
    };
    useEffect(() => {
        if (!user) {
            navigate('/')
        }
        dispatch(getCmapaigns())
        dispatch(getUsers())
        evaluate()
    }, [])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>

            {user && <div>
                <Header />
                <div className="mainTab mwidth">
                    <div className="bloc-tabs">
                        <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                            <div className="d-flex justify-content-center align-items-center">
                                <MdCampaign className="iconTab" />
                                <h4>Campaign Table</h4>
                            </div>
                        </button>
                        <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                            <div className="d-flex justify-content-center align-items-center">
                                <MdDashboard className="iconTab" />
                                <h4>Dashboard</h4>
                            </div>
                        </button>
                    </div>


                    <div className="content-tabs">
                        <div className={toggleState === 1 ? "contents  active-content" : "contents"}>
                            <CampaignTable campaigns={campaigns} />
                        </div>

                        <div className={toggleState === 2 ? "contents  active-content" : "contents"}>
                            <Dashboard chartData={userData} />
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default Tabz;