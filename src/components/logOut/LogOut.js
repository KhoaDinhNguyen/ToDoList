import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    const onClickLogOut = () => {
        sessionStorage.setItem("username", "");
        navigate("/ToDoList/login");
    };
    
    return (
        <>
            <button onClick={onClickLogOut}>Log out</button>
        </>
    )
}

export default LogOut;