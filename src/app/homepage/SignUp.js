import { useState } from "react";
import { fetchSignUp } from "../../features/page/pageAPI";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import './SignUp.css';
import signUpLogo from '../../img/homepage/signupPage.png' ;
import { useNavigate } from "react-router-dom";

function SignUp() {
   
    return (
        <>  
            <Helmet>
                <title>Sign Up | ToDo List</title>
            </Helmet>
            <div id="signUp">
                <SignUpIntro/>
                <SignUpMain/>
            </div>
        </>
    );
}

function SignUpIntro() {
    return (
        <div id="signUpIntro">
            <h2>Discover the Future of Scheduling</h2>
            <p>Unlock your potential with MasterTask, the ultimate tool for productivity. Begin your journey now with a hassle-free sign-up!</p>
        </div>
    )
}

function SignUpMain() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [accountName, setAccountName] = useState("");
    const [profileName, setProfileName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const onChangeAccountName = event => { setAccountName(event.target.value); };
    const onChangeProfileName = event => { setProfileName(event.target.value); };
    const onChangePassword = event => { setPassword(event.target.value); };
    const onChangeConfirmedPassword = event => { setConfirmedPassword(event.target.value); };

    const onSubmitSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (password !== confirmedPassword) {
            setMessage("The confirm password is different.");
            setLoading(false);
            setTimeout(() => {
                setMessage("");
            }, 5000);
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
                else {
                    setTimeout(() => {
                        setMessage("");
                    }, 5000);
                }

            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div id="signUpMain">
        <div id="signUpContextHeader">
            <img src={signUpLogo} alt="SignUp logo"/>
            <h2>Create an account</h2>
            <p>Already have an account? <NavLink to="/homepage/login">Sign in</NavLink></p>
        </div>
        <form onSubmit={onSubmitSignIn} id="signUpForm">
            <div className="signUpInput">
                <input type="text" id="accountNameSignUp" name="accountNameSignUp" value={accountName} onChange={onChangeAccountName} required autoComplete="off" placeholder="Username" title="Only used for login"/>
            </div>
            <div className="signUpInput">
                <input type="text" id="profileNameSignUp" name="profileNameSignUp" value={profileName} onChange={onChangeProfileName} required autoComplete="off" placeholder="Profile name" title="Displayed name in public"/>
            </div>
            <div className="signUpInput">
                <input type="password" id="passwordSignUp" name="passwordSignUp" value={password} onChange={onChangePassword} required autoComplete="off" placeholder="Password"/>
            </div>
            <div className="signUpInput">
                <input type="password" id="confirmedPasswordSignUp" name="confirmedPasswordSignUp" value={confirmedPassword} onChange={onChangeConfirmedPassword} required autoComplete="off" placeholder="Confirmed password"/>
            </div>
            <input type="submit" value="Sign Up" id="signUpSubmit" name="signUpSubmit"/>
            <label htmlFor="signUpSubmit" id="signUpSubmitLabel">Sign Up</label>
        </form>
        <div id="message" style={{visibility: message === ''? 'hidden' : 'visible'}}>
            <SignUpState loading={loading} message={message}/>
        </div>
        <SignUpDialog message={message} setMessage={setMessage}/>

    </div>
    )
}
function SignUpState(props) {
    const { loading, message } = props; 

    if (loading === false && message === 'Sign up successfully. Return to login to sign in') return <p>{message}</p>;
    if (loading === false) return <p style={{color: "red"}}>&#9432; {message}</p>;    
    return <p>...Authenticating</p>;
}

function SignUpDialog(props) {
    const { message, setMessage } = props;
    const navigate = useNavigate();

    const onClickGoToLogin = () => {
        navigate('/homepage/login');
    }

    const onClickStayOnThePage = () => {
        setMessage("");
    }

    return (
        <div id="dialog" className={`${message === 'Sign up successfully. Return to login to sign in'? "visibleDialog" : "notVisibleDialog"}`}>
            <div id="signUpDialogMain" className={`${message === 'Sign up successfully. Return to login to sign in'? "visibleSignUpDialog" : "notVisibleSignUpDialog"}`}>
                <p id="symbol" className="successSymbol"><span>&#10003;</span></p>
                <p>{message}</p>
                <div id="button">
                    <button onClick={onClickGoToLogin}>Go to login</button>
                    <button onClick={onClickStayOnThePage}>Stay on the page</button>
                </div>
            </div>
        </div>
    );
}
export default SignUp;
