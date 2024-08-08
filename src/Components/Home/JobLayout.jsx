import { TiShoppingBag } from "react-icons/ti";
import style from "../../module/LatestJob.module.css";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
const JobLayout=({jobs})=>{
    
    const navigate=useNavigate()
    const handleonclick=(jobId)=>{
        navigate(`/job/${jobId}`)
    }
    
    return(
        <>
         <div className={style.jobContainer}> 
             {
                jobs.map(job=>{
                   return<div className={style.job}>
                         {job.logo && (
                                <img src={job.logo.url} alt={`${job.title} logo`}  />
                            )}
                       <div>
                           <b><p>{job.title}</p></b> 
                           {/* <span onClick={() => toggleSaveJob(elemnt._id)}>
                                        <CiHeart className={saved.includes(elemnt._id) ? 'saved' : ''} />
                                    </span> */}
                           <div className={style.detail}>
                           <p><TiShoppingBag style={{marginRight:'3px'}} />{job.company}</p>
                           <p><FaLocationDot style={{marginRight:'3px'}} />{job.location}</p>
                           <p style={{backgroundColor:'rgb(10, 90, 38,0.5)',padding:'3px',borderRadius:'8px',color:'green'}}>{job.employmentType}</p>   
                           </div>
                           <button onClick={()=>handleonclick(job._id)}>Job Detail</button>
                           </div>
                       </div>
                })
             }
           </div>
        </>
    )
}
export default JobLayout;