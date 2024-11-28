import { Helmet } from "react-helmet";

function UserProfile() {
    const accountName = localStorage.getItem('accountName');
    const profileName = localStorage.getItem('profileName');

    return (
        <>
            <Helmet>
                <title>Profile | ToDo List</title>
            </Helmet>
            <p>Account name: {accountName}</p>
            <p>Profile name: {profileName}</p>
        </>
    );
}

export default UserProfile;