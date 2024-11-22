import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { accountNameSignUpSlice, profileNameSignUpSlice, passwordSignUpSlice, correctPasswordSignUpSlice } from "../../features/page/signUpSlice";
import { fetchSignUp } from "../../features/page/pageAPI";

function SignUp() {
    const dispatch = useDispatch();
    const accountName = useSelector(state => state[accountNameSignUpSlice.name]);
    const profileName = useSelector(state => state[profileNameSignUpSlice.name]);
    const password = useSelector(state => state[passwordSignUpSlice.name]);
    const correctPassword = useSelector(state => state[correctPasswordSignUpSlice.name]);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(undefined);

    const onChangeAccountName = (event) => {
        dispatch(accountNameSignUpSlice.actions.add(event.target.value));
    }

    const onChangeProfileName = (event) => {
        dispatch(profileNameSignUpSlice.actions.add(event.target.value));
    }

    const onChangePassword = (event) => {
        dispatch(passwordSignUpSlice.actions.add(event.target.value));
    }

    const onChangeCorrectPassword = (event) => {
        dispatch(correctPasswordSignUpSlice.actions.add(event.target.value));
    }

    const onSubmitSignIn = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (password !== correctPassword) {
            setResponse({message: "The confirm password is different.", error: "Have error"});
            setLoading(false);
        }
        else {
            fetchSignUp(accountName, profileName, password)
            .then(response =>{
                setLoading(false);
                setResponse(response);
                if (response.message === 'Sign up successfully. Return to login to sign in') {
                    dispatch(accountNameSignUpSlice.actions.clean());
                    dispatch(profileNameSignUpSlice.actions.clean());
                    dispatch(passwordSignUpSlice.actions.clean());
                    dispatch(correctPasswordSignUpSlice.actions.clean());
                }
            })
            .catch(err => {
                console.log(err);
            })
        }

    }
    return (
        <>
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
                <label htmlFor="correctPassword">Confirm password: </label>
                <input type="password" id="correctPassword" name="correctPassword" value={correctPassword} onChange={onChangeCorrectPassword} required autoComplete="off"/>
                <br></br>
                <input type="submit" value=" Sign Up "/>
            </form>
            <SignUpState loading={loading} response={response}/>
        </>
    )
}

function SignUpState(prop) {
    const response = prop.response;
    const loading = prop.loading;

    if (loading === true) {
        return (
            <>
                <p>...Creating account</p>
            </>
        )
    }
    if (response === undefined) {
        return (
            <>
                <p></p>
            </>
        )
    }
    else {
        return (
            <p>{response.message}</p>
        );
    }
}

export default SignUp;
