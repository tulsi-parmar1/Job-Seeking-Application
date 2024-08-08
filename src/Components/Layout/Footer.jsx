
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import style from "../../module/Footer.module.css"

function Footer() {
    const { isAuthorized } = useSelector(state => state.user);
    return (
        <>
            {/* <footer className={!isAuthorized && style.footerHide}>
                <div>
                    &copy; All Rights Reserved by Tulsi
                </div>
                <div>
                </div>
            </footer> */}
            <div className={`${style.footer} ${!isAuthorized && style.footerHide}`}  >
        <div className={style.one}>
                                <h1 >Shop Non-Stop on Meesho</h1>
                                <p>Trusted by more than 1 Crore Indians
                                    Cash on Delivery | Free Delivery</p>
                                <div className={style.image}>
                                    <img src="g.webp" alt="" style={{height:'50px', width:'170px;'}}/>&nbsp; &nbsp;
                                    <img src="g2.webp" alt="" style={{height:'50px', width:'170px;'}}/>
                                </div>
        </div>



        <div className={style.two}>
                <div className={style.link}>
                    <div><a href="">Careers</a><br/></div>
                    <div><a href="">Became a supplier</a><br/></div>
                    <div> <a href="">Hall od frame</a><br/></div>
                     <div> <a href="">Sitemap</a><br/></div>
                </div>
        </div>



        <div className={style.three}>
            <div className={style.link2}>
                <div><a href="">Legal and Polices</a></div>
                <div><a href="">Meesho tech Blog</a></div>
                <div><a href="">Notices and Returns</a></div>
                
            </div>
        </div>
        <div className={style.four}>
            <h3>Reach out to us</h3>
            <div className={style.icon}>
               <a className={style.none} href="">      <Link to="/" target="_blank"><FaFacebook /></Link> </a>
                <a href=""> <Link to="/" target="_blank"><FaInstagram /></Link></a>
               <a href=""> <i class="fa-brands fa-twitter"></i></a>
                <a href="https://www.linkedin.com/in/tulsi-parmar-76a865290/"><i class="fa-brands fa-linkedin"></i></a>
                <a href=""><i class="fa-brands fa-youtube"></i></a>
            </div>
        </div>


        <div className={style.five}>
         <h2>Contact Us</h2>
         <p>Fashnear Technologies Private Limited,
            CIN: U74900KA2015PTC082263
            06-105-B, 06-102, (138 Wu) Vaishnavi Signature, No. 78/9, Outer Ring Road, Bellandur, Varthur Hobli, Bengaluru-560103, Karnataka, India
            E-mail address: query@meesho.com
            © 2015-2024 Meesho.com</p>
        </div>

   </div>
        </>
    )
}
export default Footer;