
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import style from "../../module/JobDetail.module.css";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { GrFormPrevious } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { IoLocation } from "react-icons/io5";
import { useEffect } from "react";
import { LuDot } from "react-icons/lu";
import { toast } from "react-toastify";
import axios from "axios";
import { userAction } from "../../Slices/userSlice";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
const JobDetailSub = ({ job, applicants, id }) => {
    const navigate = useNavigate();
    const [saved, setSaved] = useState([]);
    const dispatch = useDispatch();
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const { users } = useSelector(state => state.user)
    const toggleSaveJob = async (jobId) => {
        try {
            const response = await axios.post(`http://localhost:4000/api/user/savedJobs/${users._id}/${jobId}`, {}, { withCredentials: true });
            if (response.status === 200) {
                setSaved(response.data.savedJobs);
                toast.success(response.data.message);
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
            {/* <div className={style.full}> */}
            {/* <GrLinkPrevious  style={{fontSize:'30px'}} className={style.previous} onClick={()=>window.history.back()}/>   */}
            {/* <div className={style.jobdetailmain}>    
                <div className={style.jobdetailcontainer}>
               
                    <div className={style.jobdetail}>

                        <div style={{display:'flex'}}>
                        <div className={style.logo}>
                        {job.logo && (
                                <img src={job.logo.url} alt={`${job.title} logo`} />
                            
                            )}
                                <h2>{job.company}</h2> <br />
                                <div className={style.f1}> <br />
                             <p className={style.title}><span>{job.title}</span></p>
                             </div>
                       </div>

                            <div>
                                save
                            </div>
                            </div>
                        <div className={style.first}>
                            <div className={style.f3}>
                                   <p><IoLocation />{job.location}</p> 
                            </div>
                            <div className={style.f2}>
                            <p><span>{job.employmentType}</span></p>
                            </div>
                            <div>
                            <p> <LiaRupeeSignSolid /><span>{job.salaryRange ? `${job.salaryRange.min}-${job.salaryRange.max}` : 'N/A'}</span></p>
                            </div>
                        </div>
                        <div className={style.last}>
                        <p className={style.description}>description:<span>{job.description}</span></p>
                        <p>contact Email:<span>{job.contactEmail}</span></p>
                        <p>categories:<span>{job.categories}</span></p>  
                        <p>Requirements: </p>
                        <ul>
                            {job.requirements &&
                                job.requirements.map((requirement, index) =>
                                    <span key={index}><li>{requirement}</li></span>
                                )}
                        </ul>
                        <p>Responsibilities:</p>
                        <ul>
                            {
                                job.responsibilities && job.responsibilities.map((item, index) => {
                                    return <span key={index}> <li key={index}>{item}</li></span>
                                })
                            }
                        </ul>
                        <p>Posted Date: <span>{formatDate(job.postedDate)}</span></p>
                        </div>
                        <div className={style.applicants}>
                        <p>Applicants:<span style={{ color:'#088395' }} > {
                            applicants
                        }</span></p>
                         <p>
                            {(users._id===job.postedBy && applicants>0) &&  <button  onClick={()=>navigate(`/application/viewapplication/${id}`)} >view applicants</button> 
                              }  
                           {!(users._id===job.postedBy) && <button  onClick={()=>navigate(`/application/${job._id}`)} >Apply now</button> }
                         </p>  
                        </div>
                    </div>
                </div>
            </div>
            </div> */}
            <GrLinkPrevious style={{ fontSize: '30px' }} className={style.previous} onClick={() => window.history.back()} />
            <div className={style.themain}>
                <div className={style.first}>
                    <h1>{job.title}</h1>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <p>
                            {(users._id === job.postedBy && applicants > 0) && <button onClick={() => navigate(`/application/viewapplication/${id}`)} >view applicants</button>
                            }
                            {!(users._id === job.postedBy) && <button onClick={() => navigate(`/application/${job._id}`)} >Apply now</button>}
                        </p>
                        <div onClick={() => toggleSaveJob(job._id)} className={`${saved.includes(job._id) ? style.save : style.unsave} `} style={{ border: '0.5px solid rgba(128, 128, 128, 0.492)', padding: '5px', borderRadius: '8px' }}>
                            {saved.includes(job._id) ? <FaBookmark style={{ fontSize: '25px' }} />
                                : <FaRegBookmark style={{ fontSize: '25px' }} />}
                        </div>
                    </div>
                </div>
                <div className={style.second}>
                    <div className={style.logo}>
                        {job.logo && (
                            <img src={job.logo.url} alt={`${job.title} logo`} />
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column',gap:'6px'}} >
                        <div style={{ display: 'flex', gap: '50px' }}>
                            <p style={{color:'#088395',fontWeight:'bold'}}>{job.company}</p>
                            <p><IoLocation />{job.location}</p>
                        </div>
                        <div className={style.threedesign}>
                            <p>{job.employmentType}</p>
                            <p>intership</p>
                            <p>experience</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Description:</p>
                    <p style={{fontSize:'17px'}}>{job.description}</p>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Requirements: </p>
                    <ul>
                        {job.requirements && job.requirements[0]
                            .split(',')
                            .map((requirement, index) => (
                                <li key={index} ><LuDot />{requirement.trim()}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Responsibilities: </p>
                    <ul>
                        {job.responsibilities && job.responsibilities[0]
                            .split(',')
                            .map((responsibilities, index) => (
                                <li key={index}><LuDot />{responsibilities.trim()}</li>
                            ))
                        }
                    </ul>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Qualification</p>
                    <p>Graduated</p>
                </div>
                <div>
                    <p style={{fontWeight:'bold'}}>Salary Range:</p>
                    <div>
                        <p> <LiaRupeeSignSolid /><span>{job.salaryRange ? `${job.salaryRange.min}-${job.salaryRange.max}` : 'N/A'}</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default JobDetailSub;