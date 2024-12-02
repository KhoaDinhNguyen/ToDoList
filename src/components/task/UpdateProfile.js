import { useState } from "react";
import { featchUserUpdate } from "../../features/user/userAPI";

function UpdateProfile() {
    return (
        <>
            <ChangePassword/>
        </>
    )
}

function ChangePassword() {
    const [display, setDisplay] = useState('block');
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmedPassword, setNewConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const [revealPassword, setRevealPassword] = useState("password");
    const accountName = localStorage.getItem('accountName');

    const onChangeNewPassword = event => { setNewPassword(event.target.value); };
    const onChangeNewConfirmedPassword = event => { setNewConfirmedPassword(event.target.value); };
    
    const onClickRevealPassword = () => {
        if (revealPassword === 'password') setRevealPassword('text');
        else setRevealPassword('password');
    }
    const onClickDisplay = () => {
        setNewPassword("");
        setNewConfirmedPassword("");
        if (display === 'block') setDisplay('none');
        else setDisplay('block');
    };

    const onSubmitChangePasswordForm = event => {
        event.preventDefault();
        if (newPassword !== newConfirmedPassword) {
            setMessage("Confirmed password is not the same");
        }
        else {
            featchUserUpdate(accountName, "password", null, newPassword)
            .then(response => {
                setMessage(response.message);

                setTimeout(() => {
                    setMessage("");
                }, 2000);
            })
            .catch(err => {
                console.log(err);
            });
        }
    };

    return (
        <>
            <button style={{display: display}} onClick={onClickDisplay}>Change password</button>
            <form style={{display: negateDisplay(display)}} onSubmit={onSubmitChangePasswordForm}>
                <label htmlFor="changePassword">New password: </label>
                <input type={revealPassword} name="changePassword" id="changePassword" value={newPassword} onChange={onChangeNewPassword} autoComplete="off"/>
                <br/>
                <label htmlFor="changeConfirmedPassword">Confirm new password: </label>
                <input type={revealPassword} name="changeConfirmedPassword" id="changeConfirmedPassword" value={newConfirmedPassword} onChange={onChangeNewConfirmedPassword} autoComplete="off"/>
                <br/>
                <input type="button" name="revealNewPassword" id="revealNewPassword" value="See password" onClick={onClickRevealPassword}/>
                <br/>
                <input type="submit" value="Change password"/>
            </form>
            <button style={{display: negateDisplay(display)}} onClick={onClickDisplay}>Cancel</button>
            <p>{message}</p>
        </>
    )
}

function negateDisplay(display) {
    if (display === 'block') return 'none';
    else return 'block';
}
export default UpdateProfile;