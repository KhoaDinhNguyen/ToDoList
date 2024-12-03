import { useState } from "react";
import { fetchFindAccount } from "../../features/page/pageAPI";
import { featchUserUpdate } from "../../features/user/userAPI";
import { useNavigate } from "react-router-dom";

function ForgetPassword() {
    const [accountName, setAccountName] = useState("");
    const [message, setMessage] = useState("");
    const [displayChangePasswordForm, setDisplayChangePasswordForm] = useState('none');
    const onChangeAccountName = event => { setAccountName(event.target.value); };

    const onSubmitForgetPassword = event => {
        event.preventDefault();
        fetchFindAccount(accountName)
        .then(response => {
            if (!response.error) {
                setDisplayChangePasswordForm('block');
            }
            else {
                setDisplayChangePasswordForm('none');
                setMessage(response.message);
                setTimeout(() => {
                    setMessage("");
                }, 2000)
            }
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <>
            <form onSubmit={onSubmitForgetPassword}>
                <label htmlFor="accountName">Enter account name: </label>
                <input type="text" name="accountName" id="accountName" value={accountName} onChange={onChangeAccountName}/>
                <br/>
                <input type="submit" value="Find account name"/>
            </form>
            <p>{message}</p>
            <ChangePasswordForm display={displayChangePasswordForm} accountName={accountName}/>
        </>
    )
}

function ChangePasswordForm(props) {
    const { display, accountName } = props;
    const [displayPassword, setDisplayPassword] = useState('password');
    const [newPassword, setNewPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeNewPassword = event => { setNewPassword(event.target.value); }
    const onChangeConfirmedPassword = event => {setConfirmedPassword(event.target.value); }

    const onClickDisplayPassword = () => {
        if (displayPassword === 'password') setDisplayPassword('text');
        else setNewPassword('password')
    }
    const onSubmitChangePasswordForm = event => {
        event.preventDefault();
        if (newPassword !== confirmedPassword) {
            setMessage("The new passwrod and confirmed password are not the same");
        }
        else {
            featchUserUpdate(accountName, "password", null, newPassword)
            .then(response => {
                setMessage(response.message);
                if (!response.error) {
                    alert(response.message);
                    navigate("/homepage/login");
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    return (
        <>
            <div id="changePasswordForm" style={{display: display}}>
                <form onSubmit={onSubmitChangePasswordForm}>
                    <label htmlFor="newPassword">New passord: </label>
                    <input type={displayPassword} name="newPassword" id="newPassword" autoComplete="off" value={newPassword} onChange={onChangeNewPassword}/>
                    <br/>
                    <label htmlFor="confirmedPassword">Confirmed passord: </label>
                    <input type={displayPassword} name="confirmedPassword" id="confirmedPassword" autoComplete="off" value={confirmedPassword} onChange={onChangeConfirmedPassword}/>
                    <br/>
                    <input type="button" value="See password" onClick={onClickDisplayPassword}/>
                    <br/>
                    <input type="submit" value="Change password"/>
                </form>
                <p>{message}</p>
            </div>
        </>
    )
}
export default ForgetPassword;