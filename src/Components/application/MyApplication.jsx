
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResumeFormat from "./ResumeFormat";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApplication() {
    const { isAuthorized } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [resumeImageUrl, setResumeImageUrl] = useState('');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/application/getMyApplication', { withCredentials: true });
                setApplications(data);
            } catch (error) {
                alert(error);
            }
        };
        fetchApplications();
    }, [isAuthorized]);

    const deleteApplication = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/api/application/deleteApplication/${id}`, { withCredentials: true });
            toast.success(data.message);
            alert(data.message);
            setApplications((prevApplications) => {
                return prevApplications.filter((application) => application._id !== id);
            });
        } catch (error) {
            toast.error(error);

        }
    };

    const openModal = (imageUrl) => {
        setResumeImageUrl(imageUrl);
        setModalOpen(true);
    };
    
    const closeModal = () => {
        setModalOpen(false);
    };

    if (!isAuthorized) {
        navigate('/');
    }

    return (
        <>
            <div className="application-page">
                
                { applications.length > 0 ? applications.map((element) => (
                    <JobSeekerCard 
                        element={element} 
                        key={element._id} 
                        deleteApplication={deleteApplication} 
                        openModal={openModal} 
                    />
                )) : <h1>you dont have applied for any of job</h1>}
                {modalOpen && (<ResumeFormat imageUrl={resumeImageUrl} onClose={closeModal} />)}
            </div>
        </>
    );
}

export default MyApplication;

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
    return (
        <div className="job_seeker_card">
                 <h1>My Applications</h1>
            <div className="detail">
                <p><span>First Name:</span>{element.firstName}</p>
                <p><span>Last Name:</span>{element.lastName}</p>
                <p><span>Email:</span>{element.email}</p>
                <p><span>Contact Number:</span>{element.contactNumber}</p>
                <p><span>Current City:</span>{element.currentCity}</p>
                <p><span>Cover Letter:</span>{element.coverLetter}</p>
            </div>
            <div className="resume">
                <img src={element.resume.url} alt="resume" onClick={() => openModal(element.resume.url)} />
            </div>
            <div className="btn_area">
                <button onClick={() => deleteApplication(element._id)}>Delete</button>
            </div>
        </div>
    );
};
