import axios from "axios";
import { useEffect, useState } from "react";

import style from "../../module/LatestJob.module.css";


import JobLayout from "./JobLayout";
const LatestJob=()=>{

    const [latestjob,setLatestJob]=useState([]);
    useEffect(()=>{
            axios.get('http://localhost:4000/api/job/latestJob').then((res)=>{
                setLatestJob(res.data);
            })
    },[]);   
   
       return(<>
       <div className={style.maincontainer}>
          <h1 style={{margin:'60px'}}>Latest Jobs</h1>
        <JobLayout jobs={latestjob}></JobLayout>
        </div>
        </>)
}
export default LatestJob;