import React,{useCallback,useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { getDashboardData } from '../../apis/DashboardApi';
import DashboardCard from '../DashBoardCard/DashboardCard';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {toTitleCase} from  "../../Utilities/helper"
export default function Dashboard() {
    const [isLoading,setIsLoading]=useState(true);
    const [isServerError,setIsServerError]= useState(false);
    const history= useHistory();
    const [data,setData]=useState({});
    const getData = useCallback( async () => {
        let resp= await getDashboardData();
        if(resp.status===401){
            localStorage.setItem("returnUrl","/dashboard")
            history.push('/'); return;
        }
        if(resp.statusCode==="200") setData(resp.data);
        else setIsServerError(true);
        setIsLoading(false); return;
        },[history])

    useEffect(() => {
        getData();
    }, [getData])
    
    return (

        <div>
            
            {
                isLoading ?  <LoadingSpinner></LoadingSpinner> :
                <div>
                    {
                        isServerError ? <h3 className="dash-title txt-danger" > Server Error </h3> :
                        <div>
                            <h3 className="dash-title"> Welcome { toTitleCase(data.name)}!</h3>
                            <div className="dashboard-card-con">
                                {Object.keys(data).map((item,index)=>{
                                    if(item!=="name"){
                                        return (<DashboardCard text={item} data={data[item]} 
                                            key={index + Date.now}/>)
                                    }
                                    return "";  
                                })}
                            </div>
                        </div>
                    }
                    
                    
                </div>
            }
            
            
        </div>
    
    )
}
