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
        <>
            <button onClick={onClickLogOut} id="logOut">
                <img src={logOutLogo} alt="logout"/>
                <p>Log out</p>
            </button>
        </>
    )
}

export default LogOut;