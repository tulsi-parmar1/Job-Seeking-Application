import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestJob=()=>{

    const [latestjob,setLatestJob]=useState([]);
    useEffect(()=>{
            axios.get('http://localhost:4000/api/job/latestJob').then((res)=>{
                setLatestJob(res.data);
            })
    },[]);
       
       return(<>
       <div> 
             {
                latestjob.map(job=>{
                   return<div>
                           <p>{job.title}</p>
                           <p>{job.company}</p>
                           <p>{job.location}</p>
                           <Link to={`/job/${job._id}`}>job details</Link>
                       </div>
                })
             }
             </div>
        </>)
}
export default LatestJob;