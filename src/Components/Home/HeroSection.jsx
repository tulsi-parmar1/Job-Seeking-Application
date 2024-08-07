
import { useNavigate } from "react-router-dom"
import style from "../../module/HeroSection.module.css";
// import { faCamera } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { IconContext } from "react-icons";
import PopularCategory from './PopularCategory';

function HeroSection() {
   
    const navigate = useNavigate()
    const handleonclick = () => {
        navigate('/job/getall');
    }
    return (
        <>

            <div className={style.hero}>
                <div className={style.content}>
                    <h1>Unlock Your Professional Potential </h1>
                    <p>Connecting top talent with exceptional opportunities. <br />
                        Where your next great hire is just a  <span className={style.span}> click away. </span></p>
                    <button onClick={handleonclick}>Find Job</button>
                </div>
                <div className={style.image}>
                    {/* <img src="img1.jpeg" alt="" /> 
                       <img src="img2.jpeg" alt="" /> */}
                    <img src="resume.png" alt="" />
                </div>
            </div>
            <PopularCategory></PopularCategory>
        </>
    )
}
export default HeroSection;