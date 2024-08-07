import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { userAction} from "../../Slices/userSlice"; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { isAuthorized } = useSelector(state => state.user);
    const handleRegister=async(e)=>{
            navigate('/register')
    }
    const handleLogin = async(e) => {
        e.preventDefault();
        try {
            const { data } =await axios.post("http://localhost:4000/api/user/login", { email,  password }, {
                withCredentials: true, headers: {
                    "Content-Type": "application/json",
                }
            });
            toast.success(data.message);
            setEmail("");
            setPassword("");
            dispatch(userAction.setIsAuthorized(true));
        } catch (error) {
            toast.error(error.response.data.message)
            dispatch(userAction.setIsAuthorized(false));
            
        }
    }
        
        useEffect(()=>{
            if (isAuthorized) {
                navigate('/');
            }
        },[isAuthorized])
    return (
        <>
  
            <div className="authPage">
                <div className="container">
                    <div className="header">
                        <img src="job2.webp" alt="logo" />
                    
                    </div>
                    <form action="">
                        <div className="inputTag">
                            <label >login as</label>
                           
                            <div>
                                <label >email</label>
                                <input type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            
                            <div>
                                <label >password</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <input type="submit" name="submit" onClick={handleLogin}/>
                            </div>
                            <div>
                                Register <button onClick={handleRegister} >Register</button>
                            </div>
                        </div>
                    </form>
                </div>
                <img src="job.jpg" alt="register" height='600px' width='800px'/>
            </div>
        </>
    )
}
export default Login;