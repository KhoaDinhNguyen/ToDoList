import { useNavigate } from "react-router-dom";

function LogOut(props) {
    const navigate = useNavigate();

    const onClickLogOut = () => {
        localStorage.clear();
        navigate("/homepage/login");

    };
    
    return (
        <>
            <button onClick={onClickLogOut}>Log out</button>
        </>
    )
}

export default LogOut;