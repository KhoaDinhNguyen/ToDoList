import { NavLink, Outlet } from "react-router-dom";
import './Homepage.css'
import logoPage from '../../img/homepage/logoPage.png';
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const linkIsActive = ({isActive}) => {
        return isActive ? "match" : "noMatch";
    }

    return(
        <div id="homepage">
            <nav>
                <div className="companyName">
                    <img src={logoPage} alt="Logo" onClick={() => {navigate('./aboutUs')}}/>
                    <p>MasterTask</p>
                </div>
                <div id="navList">
                    <ul>
                        <li><NavLink to="aboutUs" className={linkIsActive}>About us</NavLink></li>
                        <li><NavLink to="login" className={linkIsActive}>Log In</NavLink></li>
                        <li><NavLink to="signUp" className={linkIsActive}>Sign Up</NavLink></li>
                    </ul>
                </div>
            </nav>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export function Footer() {
    return (
        <footer>
            <div className="companyName">
                <img src={logoPage} alt="Logo"/>
                <p>MasterTask</p>
            </div>
            <div id="contact">
                <div id="contactLeft">
                    <p>Stay organized and achieve more with MasterTask. Put your productivity on autopilot.</p>
                </div>
                <div>
                    <p>khoacode1305@gmail.com</p>
                </div>
            </div>
        </footer>
    )
}
export default HomePage;