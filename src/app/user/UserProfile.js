import { Helmet } from "react-helmet";
import ProfileName from "../../components/user/ProfileName";
import Password from "../../components/user/Password";
function UserProfile() {
    const accountName = localStorage.getItem('accountName');

    return (
        <>
            <Helmet>
                <title>Profile | ToDo List</title>
            </Helmet>
            <p>Account name: {accountName}</p>
            <ProfileName/>
            <Password/>
        </>
    );
}

export default UserProfile;