import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchSignIn } from "../../features/page/pageAPI";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { profileNameSlice } from "../../features/user/databaseSlice";
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("NOMESSSAGE");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [displayMessage, setDisplayMessage] = useState("hidden");

    const dispatch = useDispatch();

    const onChangeAccountName = event => { setAccountName(event.target.value); }
    const onChangePassword = event => { setPassword(event.target.value); }

    const onSubmitLogin = async event => {
        event.preventDefault();
        setLoading(true);

        fetchSignIn(accountName, password)
        .then(response => {
            setLoading(false);
            if (!response.error) {
                localStorage.setItem("accountName", response.name);
                dispatch(profileNameSlice.actions.assignName(response.full_name));
                setAccountName("");
                setPassword("");
                navigate(`/user/${response.name}/homepage`);
            }
            else {
                setMessage(response.message);
                setDisplayMessage('visible');

                setTimeout(() => {
                    setMessage("NOMESSSAGE");
                    setDisplayMessage('hidden');
                }, 5000)
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    
    return (
        <>  
            <Helmet>
                <title>Login | ToDo List</title>
            </Helmet>
            <div id="login">
                <div id="loginMain">
                    <div id="loginSignUp">
                        <h2>Sign In</h2>
                        <form onSubmit={onSubmitLogin} id="loginForm">
                            <div className="input">
                                <label htmlFor="accountName">Username<span style={{color: "red"}}>&#42;</span></label>
                                <input name="accountName" id="accountName" type="text" required value={accountName} onChange={onChangeAccountName} autoComplete="off"/>
                            </div>
                            <div className="input">
                                <label htmlFor="password">Password<span style={{color: "red"}}>&#42;</span></label>
                                <input name="password" id="password" type="password" required value={password} onChange={onChangePassword} autoComplete="off"/>
                            </div>
                            <div id="loginFormFooter">
                                <NavLink to="/homepage/forgetPassword">Forgot password?</NavLink>
                            </div>
                            <input type="submit" value="Sign In"/>
                        </form>
                        <div id="message" style={{visibility: displayMessage}}>
                            <LoginStatus loading={loading} message={message}/>
                        </div>
                    </div>
                    <div id="loginIntro">
                        <h2>Welcome to To-Do List Application</h2>
                        <p>Organize your tasks effectively</p>
                        <p>Don't have an account?</p>
                        <NavLink to="/homepage/signUp">Sign Up</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

function LoginStatus(props) {
    const { loading, message } = props;

    if (loading === false) return <p style={{color: "red"}}>&#9432; {message}</p>;
    
    return <p style={{color: "black"}}>...Authenticating</p>;
}


export default Login;