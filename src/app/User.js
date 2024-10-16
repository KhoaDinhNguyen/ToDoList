import { useParams } from "react-router-dom";

function User(){
    const params = useParams();
    console.log(params);
    const userName = params.username;

    return (
        <>
            <p>{userName}</p>
        </>
    )
}

export default User;