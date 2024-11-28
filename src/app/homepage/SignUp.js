import { useState } from "react";
import { fetchSignUp } from "../../features/page/pageAPI";
import { Helmet } from "react-helmet";

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [accountName, setAccountName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const onChangeAccountName = (event) => { setAccountName(event.target.value); }
    const onChangeProfileName = (event) => { setProfileName(event.target.value); }
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeConfirmedPassword = (event) => { setConfirmedPassword(event.target.value); }

    const onSubmitSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (password !== confirmedPassword) {
            setMessage("The confirm password is different.");
            setLoading(false);
        }
        else {
            fetchSignUp(accountName, profileName, password)
            .then(response =>{
                setLoading(false);
                setMessage(response.message);
                if (!response.error) {
                    setAccountName("");
                    setProfileName("");
                    setPassword("");
                    setConfirmedPassword("");
                }
            })
            .catch(err => {
                console.log(err);
            })
        }

    }
    return (
        <>  
            <Helmet>
                <title>Sign Up | ToDo List</title>
            </Helmet>
            <p>Sign Up</p>
            <form onSubmit={onSubmitSignIn}>
                <label htmlFor="accountName">Account name: </label>
                <input type="text" id="accountName" name="accountName" value={accountName} onChange={onChangeAccountName} required autoComplete="off"/>
                <br></br>
                <label htmlFor="profileName">Profile name: </label>
                <input type="text" id="profileName" name="profileName" value={profileName} onChange={onChangeProfileName} required autoComplete="off"/>
                <br></br>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" name="password" value={password} onChange={onChangePassword} required autoComplete="off"/>
                <br></br>
                <label htmlFor="confirmedPassword">Confirm password: </label>
                <input type="password" id="confirmedPassword" name="confirmedPassword" value={confirmedPassword} onChange={onChangeConfirmedPassword} required autoComplete="off"/>
                <br></br>
                <input type="submit" value=" Sign Up "/>
            </form>
            <SignUpState loading={loading} message={message}/>
        </>
    );
}

function SignUpState(props) {
    const { loading, message } = props; 

    if (loading === false) return <p>{message}</p>;    
    return <p>...Authenticating</p>;
}

export default SignUp;
