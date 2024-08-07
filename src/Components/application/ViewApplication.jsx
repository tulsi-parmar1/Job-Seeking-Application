import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewApplication = () => {
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);
    const {id}=useParams();

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/application/getApplication/${id}`,{withCredentials:true});


                // Ensure response data contains the applicants array
                if (response.data && Array.isArray(response.data.applicants)) {
                    setApplicants(response.data.applicants);
                } else {
                    console.error('Unexpected response format:', response.data);
                    setError('Unexpected response format');
                }
                
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setError('Error fetching applicants');
            }
        };

        fetchApplicants();
    }, [id]);
    const deleteApplication = async (idd) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/api/application/deleteApplication/${idd}`, { withCredentials: true });
            toast.success(data.message);
            setApplicants((prevApplications) => {
                return prevApplications.filter((application) => application._id !== id);
            });
        } catch (error) {
            toast.error(error);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {applicants.map((applicant, index) => (
                    <li key={index}>
                        <h3>{applicant.firstName} {applicant.lastName}</h3>
                        <p>Email: {applicant.email}</p>
                        <p>Contact Number: {applicant.contactNumber}</p>
                        <p>Current City: {applicant.currentCity}</p>
                        <p>Cover Letter: {applicant.coverLetter}</p>
                        {/* <a href={applicant.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a> */}
                        <img src={applicant.resumeUrl} alt=""  height='300px'/>
                        <div className="btn_area">
                   <button onClick={() => deleteApplication(applicant._id)} style={{backgroundColor:'red',height:'40px',width:'200px'}}>Delete</button>
            </div>
                     </li>
                ))}
            </ul>
            {applicants.length <=0  &&  <h1>no application</h1>}
        </div>
    );
};

export default ViewApplication;
