import { NavLink, Outlet } from "react-router-dom";
import './Homepage.css'
import logoPage from '../../img/homepage/logoPage.png';

function HomePage() {

    const linkIsActive = ({isActive}) => {
        return isActive ? "match" : "noMatch";
    }
    return(
        <div id="homepage">
            <nav>
                <div id="companyName">
                    <img src={logoPage} alt="Logo"/>
                    <p>MasterTask</p>
                </div>
                <div id="navList">
                    <ul>
                        <li><NavLink to="aboutUs" className={linkIsActive}>About us</NavLink></li>
                        <li ><NavLink to="login" className={linkIsActive}>Login</NavLink></li>
                        <li><NavLink to="signUp" className={linkIsActive}>Sign Up</NavLink></li>
                    </ul>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default HomePage;