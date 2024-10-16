import { useSelector, useDispatch } from "react-redux";
import { userNameLoginSlice, passwordLoginSlice } from "../features/signIn/signInSlice";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8080/ToDoList/authen";

function Login() {
    
    const username = useSelector((state) => state[userNameLoginSlice.name]);
    const password = useSelector((state) => state[passwordLoginSlice.name]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeUserName = (event) => {
        dispatch(userNameLoginSlice.actions.add(event.target.value));
    }

    const onChangePassword = (event) => {
        dispatch(passwordLoginSlice.actions.add(event.target.value));
    }

    const onClickLogin = async () => {
        const data = JSON.stringify({username: username, password: password});
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type' : 'application/json'
                }
            })
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                navigate(`/${jsonResponse.name}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <label htmlFor="username">User name </label>
            <input name="username" type="text" required value={username} onChange={onChangeUserName}/>
            <br></br>
            <label htmlFor="password">Password </label>
            <input name="password" type="password" value={password} required onChange={onChangePassword}/>
            <br></br>
            <button onClick={onClickLogin}> Sign in </button>
        </>
    )
}

export default Login;