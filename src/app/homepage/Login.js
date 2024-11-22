import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accountNameLoginSlice, passwordLoginSlice } from "../../features/page/signInSlice";
import { fetchSignIn } from "../../features/page/pageAPI";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const accountName = useSelector((state) => state[accountNameLoginSlice.name]);
    const password = useSelector((state) => state[passwordLoginSlice.name]);

    const onChangeAccountName = (event) => {
        dispatch(accountNameLoginSlice.actions.add(event.target.value));
    }

    const onChangePassword = (event) => {
        dispatch(passwordLoginSlice.actions.add(event.target.value));
    }

    const onSubmitLogin = async (event) => {
        event.preventDefault();
        setLoading(true);

        fetchSignIn(accountName, password)
        .then(response => {
            setLoading(false);
            if (response.message === 'Found') {
                localStorage.setItem("accountName", response.name);
                localStorage.setItem("profileName", response.full_name);
                dispatch(accountNameLoginSlice.actions.clean());
                dispatch(passwordLoginSlice.actions.clean());
                navigate(`/ToDoList/user/${response.name}`);
            }
            else {
                setError(response.error);
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return (
        <>  
            <form onSubmit={onSubmitLogin}>
                <label htmlFor="accountName">Account name </label>
                <input name="accountName" id="accountName" type="text" required value={accountName} onChange={onChangeAccountName} autoComplete="off"/>
                <br></br>
                <label htmlFor="password">Password </label>
                <input name="password" id="password" type="password" required value={password} onChange={onChangePassword} autoComplete="off"/>
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