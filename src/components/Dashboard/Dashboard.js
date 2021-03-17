import React,{useCallback,useState,useEffect} from 'react';
import { getDashboardData } from '../../apis/DashboardApi';
import DashboardCard from '../DashBoardCard/DashboardCard';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {toTitleCase} from  "../../Utilities/helper"
export default function Dashboard() {
    const [dashboardFilter, setDashboardFilter]=useState("");
    const [isLoading,setIsLoading]=useState(true);
    const [data,setData]=useState({});
    const getData = useCallback( async () => {
        let resp= await getDashboardData(dashboardFilter);
        setData(resp.data)
        setIsLoading(false)
        return;
        },[dashboardFilter])

    useEffect(() => {
        getData();
    }, [getData])
    return (

        <div>
            
            {
                isLoading ?  <LoadingSpinner></LoadingSpinner> :
                <div>
                    <h3 className="dash-title"> Welcome { toTitleCase(data.name)}!</h3>
                    <div className="dashboard-card-con">
                        {Object.keys(data).map((item)=>{
                        console.log(item)
                        if(item!=="name"){
                            console.log(item)
                            return <DashboardCard text={item} data={data[item]}/>
                        }
                        return "";  
                    })}
                    </div>
                    
                </div>
            }
            
            
        </div>
    
    )
}
