import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Application(){
    const {isAuthorized}=useSelector(state=>state.user);
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [contactNumber,setContactNumber]=useState("");
    const [currentCity,setCurrentCity]=useState("");
    const [coverLetter,setCoverLetter]=useState("");
    const [resume,setResume]=useState(null);
    const navigate=useNavigate();
    const {id}=useParams();
    if(!isAuthorized)
    {
        navigate('/');
    }
    const handlefilechange=(e)=>{
        const resume=e.target.files[0];
        setResume(resume);
    }
    const handleApplication=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('firstName',firstName);
        formData.append('lastName',lastName);
        formData.append('contactNumber',contactNumber);
        formData.append('currentCity',currentCity);
        formData.append('email',email);
        formData.append('coverLetter',coverLetter);
        formData.append('resume',resume);
        formData.append('job',id);
        try {
            const {data}= await axios.post('http://localhost:4000/api/application/postApplication',formData,{withCredentials:true,headers:{
                "Content-Type":'multipart/form-data'
            }});
            setFirstName('');
            setLastName('');
            setContactNumber('');
            setCurrentCity('');
            setEmail('');
            setCoverLetter('');
            setResume('');
            alert(data.message);
            navigate('/job/me');
        } catch (error) {

            if (error.response.status === 400 && error.response.data.errors) {
                // Show validation errors
               toast.error(error.response.data.errors.join('\n'));
           } else {
               toast.error(error.response.data.message);
           }
            alert(error.response.data.message);
        }
    }
    return (
        <>
        <section className="application">
        <div className="container">
            <h3>Application Form</h3>
            <form onSubmit={handleApplication}>
                <input type="text" placeholder="your first  name"  value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                <input type="text" placeholder="your last name"  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                <input type="number" placeholder="your contact Number"  value={contactNumber} onChange={(e)=>setContactNumber(e.target.value)}/>
                <input type="text" placeholder="your currentCity "  value={currentCity} onChange={(e)=>setCurrentCity(e.target.value)}/>
                <input type="email" placeholder="your email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
               <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} placeholder="coverLetter"></textarea>
               <div>
                <label style={{textAlert:'start',display:'block',fontSize:'20px'}}>select resume:</label>
                <input type="file" accept=".jpg,.png,.webp"  onChange={handlefilechange}/>
               </div>
               <button type="submit">Send application</button>
            </form>
        </div>
        </section>
        </>
    )
}
export default Application;