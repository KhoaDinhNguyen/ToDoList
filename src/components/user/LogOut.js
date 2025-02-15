import { useNavigate } from "react-router-dom";
import logOutLogo from '../../img/user/logOutLogo.png';
import './LogOut.css';
function LogOut(props) {
    const navigate = useNavigate();

    const onClickLogOut = () => {
        localStorage.clear();
        navigate("/homepage/login");

    };
    
    return (
        <div id="userNavigationBarFooter">
            <button onClick={onClickLogOut} id="logOut">
                <svg fill="#ffffff" width="25px" height="25px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
                    <g id="SVGRepo_iconCarrier">
                    <title>ionicons-v5-o</title>
                    <path d="M160,256a16,16,0,0,1,16-16H320V136c0-32-33.79-56-64-56H104a56.06,56.06,0,0,0-56,56V376a56.06,56.06,0,0,0,56,56H264a56.06,56.06,0,0,0,56-56V272H176A16,16,0,0,1,160,256Z"/>
                    <path d="M459.31,244.69l-80-80a16,16,0,0,0-22.62,22.62L409.37,240H320v32h89.37l-52.68,52.69a16,16,0,1,0,22.62,22.62l80-80a16,16,0,0,0,0-22.62Z"/>
                    </g>
                </svg>
            </button>
        </div>
    )
}

export default LogOut;