import { useNavigate } from "react-router-dom";

function LogOut() {
    const navigate = useNavigate();

    const onClickLogOut = () => {
        localStorage.setItem("username", "");
        navigate("/ToDoList/homepage/login");
    };
    
    return (
        <>
            <button onClick={onClickLogOut}>Log out</button>
        </>
    )
}

export default LogOut;