import { TiShoppingBag } from "react-icons/ti";
import style from "../../module/LatestJob.module.css";
import { FaLocationDot } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FaRegBookmark } from "react-icons/fa";
import moment from "moment";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import 'react-toastify/dist/ReactToastify.css';
import { userAction } from "../../Slices/userSlice";
import { FcLike } from "react-icons/fc";
import { useGSAP } from "@gsap/react";
import { FaBookmark } from "react-icons/fa6";
import gsap from "gsap";
const JobLayout = ({ jobs ,homepage,similar, onUnsaveJob}) => {
    const jobRef = useRef();
    useEffect(() => {
        if(homepage)
        {
            gsap.fromTo(
                jobRef.current.children,
                { opacity: 0, y:-10},
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger:0.2,
                    scrollTrigger: {
                        trigger: jobRef.current,
                        start: "top 80%",
                        // end: "top 30%",
                        // scrub: true,
                    }
                }
            );
        }
       
    }),[]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [saved, setSaved] = useState([]);
    const { users } = useSelector(state => state.user);
    const handleonclick = (jobId) => {
        navigate(`/job/${jobId}`)
    }
    //when user click on save button 
    const toggleSaveJob = async (jobId) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/user/savedJobs/${users._id}/${jobId}`, {}, { withCredentials: true });
            if (response.status === 200) {
                setSaved(response.data.savedJobs);
                toast.success(response.data.message);
            }
            if (!response.data.savedJobs.includes(jobId)) {
                onUnsaveJob(jobId); // Invoke the parent function
            }
        } catch (error) {
    
            toast.error(error.response.data.message);
        }
    };
    useEffect(() => {
        try {
            axios.get(`http://localhost:4000/api/user/getUser`, { withCredentials: true }).then((res) => {
                dispatch(userAction.setUser(res.data.user));
                setSaved(res.data.savedJobs);
            });
        } catch (error) {
            toast.error(error);
        }

    }, [])
    return (
        <>
            <div className={style.container}>
                <div className={`${style.jobcontainer} ${similar && style.similar}`} ref={jobRef} >
                    {jobs.map(job => {
                        return <>
                        <div className={style.job} >
                            {/* first */}
                            <div style={{ display: 'flex',justifyContent:'space-between',gap:'40px',alignItems:'center'}}> 
                            <div style={{display:'flex',alignItems:'center'}}>
                             {job.logo && <img src={job.logo.url} alt={`${job.title} logo`} />} <span style={{ marginLeft: '7px' }}></span>
                              {/* //title and company  */}
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h4>{job.title}</h4>
                                    <div style={{ display: 'flex', gap: '7px' }}>
                                        <p>{job.company}</p>
                                        <p><FaLocationDot style={{ marginRight: '3px' }}></FaLocationDot>{job.location}</p>
                                     </div>
                                  </div>
                            </div>
                            <div onClick={() => toggleSaveJob(job._id)} className={`${saved.includes(job._id) ? style.save : style.unsave} `}>
                                {saved.includes(job._id) ? <FaBookmark />
                                    : <FaRegBookmark />}
                            </div>
                            </div>
                            <div style={{display:'flex',justifyContent:'space-between',gap:'15px'}}>
                                <p className={style.employ} style={{fontSize:'14px'}}>{job.employmentType}</p>
                                <p className={style.type} style={{fontSize:'14px'}}>Remote Job</p>
                                <p className={style.applicants} style={{fontSize:'14px'}}>Applicants:{job.applicants.length}</p>
                              {/* {console.log((job.applicants).length)} */}
                            </div>
                            <div style={{display:'flex',gap:'20px',alignItems:'center'}} className={style.last}>
                            <button onClick={() => handleonclick(job._id)}>Job Detail</button>
                            <p style={{fontSize:'13px'}}>Posted {moment(job.postedDate).fromNow()}</p>
                            </div>
                            </div>
                        </> 

                    })}
                </div>
            </div>
        </>
    )
    // return (
    //     <>
    //         <div className={style.jobContainer} ref={jobRef}>
    //             {
    //                 jobs.map(job => {
    //                     return <div className={style.job} >
    //                         {job.logo && (
    //                             <img src={job.logo.url} alt={`${job.title} logo`} />
    //                         )}
    //                         <div>
    //                             <p><b>{job.title}</b>
    //                                 <span onClick={() => toggleSaveJob(job._id)} style={{ marginLeft: '10px', fontSize: '20px' }}>
    //                                     {saved.includes(job._id) ? <FcLike /> : <CiHeart></CiHeart>}
    //                                 </span></p>
    //                             <div className={style.detail}>
    //                                 <p><TiShoppingBag style={{ marginRight: '3px' }} />{job.company}</p>
    //                                 <p><FaLocationDot style={{ marginRight: '3px' }} />{job.location}</p>
    //                                 <p style={{ backgroundColor: 'rgb(10, 90, 38,0.5)', padding: '3px', borderRadius: '8px', color: 'green' }}>{job.employmentType}</p>
    //                             </div>
    //                             <div className={style.btns}>
    //                              <div><button onClick={() => handleonclick(job._id)}>Job Detail</button></div>
    //                                 {job.postedBy == users._id &&
    //                                     <>
    //                                         {/* <Link to={`/job/update/${job._id}`}>update job</Link> */}
    //                                        <div> <button onClick={() => navigate(`/job/update/${job._id}`)}>Update Job</button></div> 
    //                                         {/* <MdDelete onClick={()=>navigate(`/job/delete/${job._id}`)} style={{fontSize:'30px',backgroundColor:'red'}} /> */}
    //                                        <div><button onClick={() => navigate(`/job/delete/${job._id}`)} style={{ backgroundColor: 'red' }}>Delete Job</button></div> 
    //                                     </>
    //                                 }</div>
    //                         </div>
    //                     </div>
    //                 })
    //             }
    //         </div>
    //     </>
    // )
}
export default JobLayout;