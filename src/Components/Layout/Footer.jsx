
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
    const { isAuthorized } = useSelector(state => state.user);
    return (
        <>
            {/* <footer className={isAuthorized ? "footerShow" : "footerHide"}> */}
                <div>
                    &copy; All Rights Reserved by Tulsi
                </div>
                <div>
                {/* //used to openn in new tag (target_black) */}
                   <Link to="/" target="_blank"><FaFacebook /></Link> 
                   <Link to="/" target="_blank"><FaInstagram /></Link>
                   <Link to="/" target="_blank"><FaYoutube /></Link>
                </div>
            {/* </footer> */}
        </>
    )
}
export default Footer;