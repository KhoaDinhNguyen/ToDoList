import { Helmet } from "react-helmet";
import UpdateProfile from "../../components/task/UpdateProfile";

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
            <UpdateProfile/>
        </>
    );
}

export default UserProfile;