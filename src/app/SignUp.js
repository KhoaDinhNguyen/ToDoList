import { useSelector, useDispatch } from "react-redux";
import { userNameSignUpSlice, fullNameSignUpSlice, passwordSignUpSlice, correctPasswordSignUpSlice } from "../features/signIn/signUpSlice";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const endpoint = "https://localhost:8080/signup";

function SignUp() {
    const dispatch = useDispatch();
    const username = useSelector(state => state[userNameSignUpSlice.name]);
    const fullname = useSelector(state => state[fullNameSignUpSlice.name]);
    const password = useSelector(state => state[passwordSignUpSlice.name]);
    const correctPassword = useSelector(state => state[correctPasswordSignUpSlice.name]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [submit, setSubmit] = useState(false);

    const onChangeUsername = (event) => {
        dispatch(userNameSignUpSlice.actions.add(event.target.value));
    }

    const onChangeFullname = (event) => {
        dispatch(fullNameSignUpSlice.actions.add(event.target.value));
    }

    const onChangePassword = (event) => {
        dispatch(passwordSignUpSlice.actions.add(event.target.value));
    }

    const onChangeCorrectPassword = (event) => {
        dispatch(correctPasswordSignUpSlice.actions.add(event.target.value));
    }

    const onSubmitSignIn = async (event) => {
        event.preventDefault();
        try {
            setSubmit(true);
            setLoading(true);
            if (password !== correctPassword) {
                setResponse({message: "The confirm password is different.", error: "Have error"});
                setLoading(false);
            }
            else {
                const data = JSON.stringify({
                    username,
                    fullname,
                    password
                })
                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    credentials: 'include'
                });
                const jsonResponse = await response.json();
                setResponse(jsonResponse);
                setLoading(false);
            }
        }
        catch(err) {
            console.log(err)
        }

    }
    return (
        <>
            <p>Sign Up</p>
            <form onSubmit={onSubmitSignIn}>
                <label htmlFor="username">User name: </label>
                <input type="text" id="username" name="username" value={username} onChange={onChangeUsername} required/>
                <br></br>
                <label htmlFor="fullname">Display name: </label>
                <input type="text" id="fullname" name="fullname" value={fullname} onChange={onChangeFullname} required/>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={onChangePassword} required/>
                <br></br>
                <label htmlFor="correctPassword">Confirm password: </label>
                <input type="password" id="correctPassword" name="correctPassword" value={correctPassword} onChange={onChangeCorrectPassword} required/>
                <br></br>
                <input type="submit" value=" Sign Up "/>
            </form>
            <SignUpState loading={loading} response={response} submit={submit}/>
            <NavLink to="/ToDoList/login">Login</NavLink>
        </>
    )
}

function SignUpState(prop) {
    const [loading, response, submit] = [prop.loading, prop.response, prop.submit];
    if (submit === false) {
        return (
        <>
            <p></p>
        </>
        )
    }
    else {
        if (loading === true) {
            return (
                <p>...Creating an account</p>
            )
        }
        else if (loading === false && !response.error){
            return (
                <p>Sign up successfully. Return to login to sign in</p>
            )
        }
        return (
            <p>{response.message}</p>
        )
    }

}

export default SignUp;
