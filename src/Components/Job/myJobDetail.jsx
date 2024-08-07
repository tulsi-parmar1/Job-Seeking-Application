import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyJobDetail() {
    const { isAuthorized } = useSelector(state => state.user);
    const navigate = useNavigate();
    const { id } = useParams();
    const [length,setlength]=useState(0);
    const [job, setJob] = useState({});


    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    useEffect(() => {
        if (!isAuthorized) {
            return navigate('/login')
        }
        axios.get(`http://localhost:4000/api/job/${id}`, { withCredentials: true }).then((res) => {
            setJob(res.data.job);
            setlength(res.data.applicantsLength);
        }).catch((err) => {
            toast.error(err.response.data.message);
        })
    }, [])

  
    return (
        <>
            <div className="jobDetail page">
                <div className="container">
                    <h3>job details</h3>
                    <div className="banner">
                        <p>title:<span>{job.title}</span></p>
                        <p>description:<span>{job.description}</span></p>
                        <p>contact Email:<span>{job.contactEmail}</span></p>
                        <p>categories:<span>{job.categories}</span></p>
                        <p>Employeement Time <span>{job.employmentType}</span></p>
                        <p>Salary: <span>{job.salaryRange ? `${job.salaryRange.min}-${job.salaryRange.max}` : 'N/A'}</span></p>
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
                        <p>Applicants:<span style={{ color: 'red' }} > {
                            length
                        }</span></p>

                        <Link to={`/application/viewapplication/${id}`} >view applicants</Link>
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default MyJobDetail;