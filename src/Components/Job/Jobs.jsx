import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userAction } from "../../Slices/userSlice";
function Jobs() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    const { isAuthorized } = useSelector(state => state.user);
    const { users} = useSelector(state => state.user);
    const dispatch=useDispatch();
    const [searchQuery, setSearchQuery] = useState();
    const [saved, setSaved] = useState([]);
    //search
    const handlesearch = (e) => {
        const search = e.target.value;
        setSearchQuery(search);
    }
    useEffect(() => {
        try {
            axios.get("http://localhost:4000/api/job/getAll ", { withCredentials: true }).then((res) => {
                setJobs(res.data.jobs);
            })
            axios.get(`http://localhost:4000/api/user/getUser`, { withCredentials: true }).then((res) => {
                dispatch(userAction.setUser(res.data.user));
                setSaved(res.data.savedJobs);
            });

        } catch (error) {
            toast.error(error);

        }
    }, [])
    if (!isAuthorized) {
        navigate('/login')
    }

    //search
    const filteredJob = searchQuery
        ? jobs.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : jobs;
        
        //when user click on save button 
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
    
    return (
        <>
            <div className="jobs page">
                <div className="container">
                    <h1>All available jobs</h1>
                    <div>
                        <input type="text" placeholder="search job" style={{ width: '300px', height: '50px', marginTop: '40px' }} onChange={handlesearch} />
                    </div>
                    <div className="banner">
                        {
                            filteredJob && filteredJob.map(elemnt => {
                                return <div className="card" key={elemnt._id}>
                                    <p>{elemnt.title}</p><span onClick={() => toggleSaveJob(elemnt._id)}>
                                        <CiHeart className={saved.includes(elemnt._id) ? 'saved' : ''} />
                                    </span>
                                    <p>{elemnt.company}</p>
                                    <p>{elemnt.location}</p>
                                    <Link to={`/job/${elemnt._id}`}>job details</Link>
                                </div>
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Jobs;