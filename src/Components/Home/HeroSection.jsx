
import { useNavigate } from "react-router-dom"
import style from "../../module/HeroSection.module.css";
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IconContext } from "react-icons";
import PopularCategory from './PopularCategory';
import { useSelector } from "react-redux";

function HeroSection() {
   
    const navigate = useNavigate();
   const {users}=useSelector(state=>state.user);
   console.log(users)
    const handleonclick = () => {
        navigate('/job/getall');
    }
    return (
        <>
            <div className={style.hero}>
              
                <div className={style.content}>
                    <h1> Welcome,<span style={{color:'#088395'}}>{users.name}</span>!</h1>
                    <h2>Unlock Your Professional Potential </h2>
                    <p>Connecting top talent with exceptional opportunities. <br />
                        Where your next great hire is just a  <span className={style.span}> click away. </span></p>
                    <button onClick={handleonclick}>Find Job</button>
                </div>
                <div className={style.image}>
                    {/* <img src="resume.png" alt="" /> */}
                    <img src="home2.png" alt="" />
                </div>
            </div>
            <PopularCategory></PopularCategory>
        </>
    )
}
export default HeroSection;