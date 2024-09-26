import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import style from "../../module/LatestJob.module.css";
import JobLayout from "./JobLayout";
import gsap from "gsap";
const LatestJob=()=>{
   
    const navigate=useNavigate();
    const textRef=useRef();
    const btnRef=useRef();
    const [latestjob,setLatestJob]=useState([]);
    const homepage=true;
    useEffect(()=>{
            axios.get('http://localhost:4000/api/job/latestJob',{withCredentials:true}).then((res)=>{
                setLatestJob(res.data);
            })
            // gsap.fromTo(textRef.current,{
            //     opacity:0,x:50
            // },{
            //     opacity:1,
            //     x:0,
            //     duration: 1,
            //     stagger: 0.1,
            //     scrollTrigger:{
            //         trigger:textRef.current,
            //         start: "top 70%",
            //     }
            // }),
            gsap.fromTo(btnRef.current,{
                opacity:0,y:0
            },{
                opacity:1,
                y:0,
                duration: 1.5,
                delay:0.9,
                scrollTrigger:{
                    trigger:btnRef.current,
                    start: "top 70%",
                }
            })
    },[]);   
       return(<>
       <div className={style.maincontainer}>
          <h1 style={{margin:'60px',textAlign:'center'}} ref={textRef}>Latest Jobs</h1>
        <JobLayout jobs={latestjob} homepage={homepage}></JobLayout>
        <div className={style.explore}>
        <button onClick={()=>navigate('job/getall')} ref={btnRef}>Explore all</button>
        </div>
       
        </div>
        </>)
}
export default LatestJob;