
import { useLocation, NavLink } from 'react-router-dom';
import style from "../../module/Profile.module.css";

function Sidebar() {
  const location = useLocation();
  
  return (
    <div className={style.sidebarlinks}>
      <NavLink
        to="/profile"
        className={location.pathname === '/profile' ? style.active : ""}
        end
      >
        Profile
      </NavLink>
      <br />
      <NavLink
        to="/profile/savedjobs"
        className={location.pathname === '/profile/savedjobs' ? style.active : ""}
      >
        Saved Jobs
      </NavLink>
      <br />
      <NavLink
        to="/profile/job/me"
        className={location.pathname === '/profile/job/me' ? style.active : ""}
      >
        My Jobs
      </NavLink>
    </div>
  );
}

export default Sidebar;

