import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";

function MyJobs() {
    const { isAuthorized } = useSelector(state => state.user);
    const [myJobs, setMyJobs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthorized) {
            navigate('/');
        }
        const fetchjobs = async () => {
            try {
                const { data } = await axios.get("http://localhost:4000/api/job/getMyJobs", { withCredentials: true });
                setMyJobs(data.myjob);   
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        fetchjobs();
    }, []);
    // console.log(myJobs[3].logo.url);
    return (
        <>
            <div className="jobs page">
                <div className="container" style={{ height: '1000px' }}>
                  
                    <div className="banner">
                        {
                            myJobs.length > 0 ? myJobs.map(elemnt => {
                                return <div className="card" key={elemnt._id}>
                                      <h1>your jobs</h1>
                                    <p>{elemnt.title}</p>
                                    <p>{elemnt.company}</p>
                                    <p>{elemnt.location}</p>
                                    {elemnt.logo && (
                                <img src={elemnt.logo.url} alt={`${elemnt.title} logo`} height='300px' />
                            )}
                                    <Link to={`/job/myJobDetail/${elemnt._id}`}>job details</Link>
                                    <Link to={`/job/update/${elemnt._id}`}>update job</Link>
                                    <Link to={`/job/delete/${elemnt._id}`}>delete job</Link>
                                </div>
                            }) : <h1>you dont post job</h1>}
                    </div>
                </div>
            </div>



        </>
    )
}
export default MyJobs;