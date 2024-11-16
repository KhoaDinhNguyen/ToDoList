import { useSelector, useDispatch } from "react-redux";
import { userNameLoginSlice, passwordLoginSlice } from "../features/signIn/signInSlice";
import { fullNameSlice, passwordSlice } from "../features/fetchingData/userDataSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const endpoint = process.env.REACT_APP_LOGIN_API_URL;

function Login() {
    const username = useSelector((state) => state[userNameLoginSlice.name]);
    const password = useSelector((state) => state[passwordLoginSlice.name]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChangeUserName = (event) => {
        dispatch(userNameLoginSlice.actions.add(event.target.value));
    }

    const onChangePassword = (event) => {
        dispatch(passwordLoginSlice.actions.add(event.target.value));
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        const data = JSON.stringify({username: username, password: password});
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                body: data,
                headers: {
                    'Content-type' : 'application/json'
                },
            })
            const jsonResponse = await response.json();
            setLoading(false);
            if (response.ok) {
                localStorage.setItem("username", username);
                dispatch(fullNameSlice.actions.initialize(jsonResponse.full_name));
                dispatch(passwordSlice.actions.initialize(jsonResponse.password));
                navigate(`/ToDoList/user/${jsonResponse.name}`);
            }
            else {
                setError(jsonResponse.error);
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>  
            <form onSubmit={onSubmitLogin}>
                <label htmlFor="username">User name </label>
                <input name="username" type="text" required value={username} onChange={onChangeUserName} autoComplete=""/>
                <br></br>
                <label htmlFor="password">Password </label>
                <input name="password" type="password" required value={password} onChange={onChangePassword} autoComplete=""/>
                <br></br>
                <input type="submit" value=" Sign in" />
            </form>

            <LoginStatus loading={loading} error={error}/>
        </>
    )
}

function LoginStatus(prop) {
    const loading = prop.loading;
    const error = prop.error;

    if (loading === false && error === "") {
        // Initial
        return <p></p>
    }
    else if (loading === false && error !== "") {
        return (
            <>
                <p>{error}</p>
            </>
        )
    }
    return (
        <>
            <p>...Authenticating</p>
        </>
    )
}
export default Login;