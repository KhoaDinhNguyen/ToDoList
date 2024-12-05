import { useState } from "react";
import { fetchSignUp } from "../../features/page/pageAPI";
import { Helmet } from "react-helmet";
import './SignUp.css';

function SignUp() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("NOMESSAGE");
    const [accountName, setAccountName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [displayMessage, setDisplayMessage] = useState('hidden');

    const onChangeAccountName = (event) => { setAccountName(event.target.value); }
    const onChangeProfileName = (event) => { setProfileName(event.target.value); }
    const onChangePassword = (event) => { setPassword(event.target.value); }
    const onChangeConfirmedPassword = (event) => { setConfirmedPassword(event.target.value); }

    const onSubmitSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (password !== confirmedPassword) {
            setMessage("The confirm password is different.");
            setDisplayMessage('visible');
            setLoading(false);
            setTimeout(() => {
                setMessage("NOMESSAGE");
                setDisplayMessage('hidden');
            }, 5000);
        }
        else {
            fetchSignUp(accountName, profileName, password)
            .then(response =>{
                setLoading(false);
                setMessage(response.message);
                setDisplayMessage('visible');

                if (!response.error) {
                    setAccountName("");
                    setProfileName("");
                    setPassword("");
                    setConfirmedPassword("");
                }
                else {
                    setTimeout(() => {
                        setMessage("NOMESSAGE");
                        setDisplayMessage('hidden');
                    }, 5000);
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
            <div id="signUp">
                <div id="signUpMain">
                    <h2>Sign Up</h2>
                    <form onSubmit={onSubmitSignIn} id="signUpForm">
                        <div className="signUpInput">
                            <label htmlFor="accountName">Username<span style={{color: "red"}}>&#42;</span></label>
                            <input type="text" id="accountName" name="accountName" value={accountName} onChange={onChangeAccountName} required autoComplete="off"/>
                        </div>
                        <div className="signUpInput">
                            <label htmlFor="profileName">Profile name<span style={{color: "red"}}>&#42;</span></label>
                            <input type="text" id="profileName" name="profileName" value={profileName} onChange={onChangeProfileName} required autoComplete="off"/>
                        </div>
                        <div className="signUpInput">
                            <label htmlFor="password">Password<span style={{color: "red"}}>&#42;</span></label>
                            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} required autoComplete="off"/>
                        </div>
                        <div className="signUpInput">
                            <label htmlFor="confirmedPassword">Confirm password<span style={{color: "red"}}>&#42;</span></label>
                            <input type="password" id="confirmedPassword" name="confirmedPassword" value={confirmedPassword} onChange={onChangeConfirmedPassword} required autoComplete="off"/>
                        </div>
                        <input type="submit" value="Sign Up"/>
                    </form>
                    <div id="message" style={{visibility: displayMessage}}>
                        <SignUpState loading={loading} message={message}/>
                    </div>
                </div>
            </div>

        </>
    );
}

function SignUpState(props) {
    const { loading, message } = props; 

    if (loading === false && message === 'Sign up successfully. Return to login to sign in') return <p>{message}</p>;
    if (loading === false) return <p style={{color: "red"}}>&#9432; {message}</p>;    
    return <p>...Authenticating</p>;
}

export default SignUp;
