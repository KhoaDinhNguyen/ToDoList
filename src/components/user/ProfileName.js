import { useEffect, useState } from "react";
import { featchUserUpdate } from "../../features/user/userAPI";
import { useSelector, useDispatch } from "react-redux";
import { profileNameSlice } from "../../features/user/databaseSlice";

function ProfileName(){
    const profileName = useSelector(state => state[profileNameSlice.name]);
    const [display, setDisplay] = useState('block');
    const [newProfileName, setNewProfileName] = useState(profileName);
    const accountName = localStorage.getItem('accountName');
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    useEffect(() => {
        setNewProfileName(profileName);
    }, [profileName]);
    
    const onChangeNewProfileName = event => { setNewProfileName(event.target.value); };

    const onClickDisplay = () => {
        if (display === 'none') setDisplay('block');
        else setDisplay('none');
    }

    const onSubmitChangeProfileForm = event => {
        event.preventDefault();
        featchUserUpdate(accountName, "profileName", newProfileName, null)
        .then(response => {
            setMessage(response.message);
            if (!response.error) {
                dispatch(profileNameSlice.actions.assignName(newProfileName));
            }

            setTimeout(() => {
                setMessage("");
            }, 2000)
        }) 
    }
    return (
        <>
            <p>Profile name: {profileName}</p>
            <button onClick={onClickDisplay} style={{display: display}}>Change profile name</button>
            <form style={{display: negateDisplay(display)}} onSubmit={onSubmitChangeProfileForm}>
                <label htmlFor="newProfileName">New profile name: </label>
                <input type="text" id="newProfileName" name="newProfileName" value={newProfileName} onChange={onChangeNewProfileName}/>
                <br/>
                <input type="submit" value="Change profile name"/>
            </form>
            <button onClick={onClickDisplay} style={{display: negateDisplay(display)}}>Cancel</button>
            <p>{message}</p>
        </> 
    )
}

function negateDisplay(display) {
    if (display === 'block') return 'none';
    else return 'block';
}
export default ProfileName;