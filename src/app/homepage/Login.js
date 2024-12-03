import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchSignIn } from "../../features/page/pageAPI";
import { Helmet } from "react-helmet";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");

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
                localStorage.setItem("profileName", response.full_name);
                setAccountName("");
                setPassword("");
                navigate(`/user/${response.name}`);
            }
            else {
                setMessage(response.message);
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
            <form onSubmit={onSubmitLogin}>
                <label htmlFor="accountName">Account name </label>
                <input name="accountName" id="accountName" type="text" required value={accountName} onChange={onChangeAccountName} autoComplete="on"/>
                <br></br>
                <label htmlFor="password">Password </label>
                <input name="password" id="password" type="password" required value={password} onChange={onChangePassword} autoComplete="off"/>
                <br></br>
                <input type="submit" value=" Sign in" />
            </form>
            <NavLink to="/homepage/forgetPassword">Forget the password</NavLink>
            <LoginStatus loading={loading} message={message}/>
        </>
    )
}

function LoginStatus(props) {
    const { loading, message } = props;

    if (loading === false) return <p>{message}</p>;
    
    return <p>...Authenticating</p>;
}


export default Login;