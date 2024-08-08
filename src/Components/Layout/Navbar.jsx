import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { TfiMenu } from "react-icons/tfi";
import { GiHamburgerMenu } from "react-icons/gi";
import { userAction } from "../../Slices/userSlice";
import style from "../../module/Navbar.module.css";
import { useEffect } from "react";
function NavBar() {

    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        //vertically scroll mate scrollY
        if (window.scrollY > 0) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      };
  
      //user scroll kre tyare j aa call thay
      window.addEventListener('scroll', handleScroll);
  
      //jyre component unMount thay tyare aa clean-up thay jay
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    


    const [show, setShow] = useState(false);
    const { isAuthorized } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {

        try {
            const response = await axios.get("http://localhost:4000/api/user/logout", { withCredentials: true });
            dispatch(userAction.setIsAuthorized(false));
            navigate('/login');
        }
        catch (err) {
            console.log(response.data)
            dispatch(userAction.setIsAuthorized(true));
        }
    }
    const handleOnClick = () => {
        setShow(!show);
    }
    const handlepostjob=()=>{
        navigate('/job/post');
    }
    return (
        <>
              <nav className={`${style.navbar} ${scrolling ? style.onscroll : ''} ${!isAuthorized &&  style.noneNavbar}` }>
                <div className={style.logo}>
                    {/* <img src="logo2.png" alt=""  /> */}
                    <h1>HIREhub</h1>
                    {/* <img src="logo.png" alt="" /> */}
                </div>
                <div className={style.menu}>
                    {show ? <IoClose className={style.icon1} onClick={handleOnClick}></IoClose> : <TfiMenu className={style.icon2} onClick={handleOnClick}></TfiMenu>}
                    <ul className={`${style.menuitems} ${show && style.menuopen}`} onClick={() => setShow(false)}>
                        <li>
                            <NavLink to='/' className={({ isActive }) =>
                                isActive ? style.active : ""
                            }>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/logout' className={({ isActive }) =>
                                isActive ? style.active : ""
                            }>logout</NavLink>
                        </li>
                        <li>
                            <NavLink to='/job/me' className={({ isActive }) =>
                                isActive ? style.active : ""
                            }>myjobs</NavLink>
                        </li>
                        <li>
                            <NavLink to='/job/getall' className={({ isActive }) =>
                                isActive ? style.active : ""
                            }>jobs</NavLink>
                        </li>
                        <li>
                            <NavLink to='/profile' className={({ isActive }) =>
                                isActive ? style.active : ""
                            }><VscAccount style={{marginTop:'10px',fontSize:'26px'}}/></NavLink>
                        </li>
                        <button onClick={handlepostjob} className={style.postjob}>Post Job</button>
                    </ul>     
                   
                </div>
            </nav>


        </>
    )
}
export default NavBar;