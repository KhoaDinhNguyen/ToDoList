import { useState } from "react";
import { fetchFindAccount } from "../../features/page/pageAPI";
import { featchUserUpdate } from "../../features/user/userAPI";
import { useNavigate } from "react-router-dom";
import styles from './ForgetPassword.module.css';

function ForgetPassword() {
    const [accountName, setAccountName] = useState("");
    const [message, setMessage] = useState("");
    const [displayChangePasswordForm, setDisplayChangePasswordForm] = useState('none');
    const onChangeAccountName = event => { setAccountName(event.target.value); };

    const onSubmitForgetPassword = event => {
        event.preventDefault();
        setMessage("Looking account...");
        
        fetchFindAccount(accountName)
        .then(response => {
            if (!response.error) {
                setDisplayChangePasswordForm('block');
                setMessage('Find successfully');
            }
            else {
                setDisplayChangePasswordForm('none');
                setMessage(response.message);
            }
            setTimeout(() => {
                setMessage("");
            }, 2000);
        })
        .catch(err => {
            console.log(err);
        })
    };

    return (
        <div id={styles.forgetPassword}>
            <form onSubmit={onSubmitForgetPassword}>
                <input type="text" name="accountNameForgetPassword" id={styles.accountNameForgetPassword} value={accountName} onChange={onChangeAccountName} placeholder="Enter username..." autoComplete="off" required/>
                <input type="submit" value="Find account name" id={styles.findAccountNameForgetPassword}/>
            </form>
            <p>{message}</p>
            <ChangePasswordForm display={displayChangePasswordForm} accountName={accountName}/>
        </div>
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
        else setDisplayPassword('password')
    }
    const onSubmitChangePasswordForm = event => {
        event.preventDefault();
        if (newPassword !== confirmedPassword) {
            setMessage("The new passwrod and confirmed password are not the same");
            setTimeout(() => {
                setMessage("");
            }, 2000);
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
        <div id={styles.changePasswordForm} style={{display: display}}>
            <form onSubmit={onSubmitChangePasswordForm}>
                <div className={styles.forgetPasswordInput}>
                    <input type={displayPassword} name="newPassword" id="newPassword" autoComplete="off" value={newPassword} onChange={onChangeNewPassword} placeholder="New password" required/>
                </div>
                <div className={styles.forgetPasswordInput}>
                    <input type={displayPassword} name="confirmedPassword" id="confirmedPassword" autoComplete="off" value={confirmedPassword} onChange={onChangeConfirmedPassword} placeholder="Confirmed password" required/>
                </div>
                <div id={styles.changePasswordButton}>
                    <input type="button" value="See password" onClick={onClickDisplayPassword} id="seePassword"/>
                    <input type="submit" value="Change password" id={styles.changePasswordSubmit}/>
                </div>
            </form>
            <p>{message}</p>
        </div>
    )
}
export default ForgetPassword;