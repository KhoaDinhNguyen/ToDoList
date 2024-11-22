import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function User() {
    const accountName = localStorage.getItem('accountName');
    const navigate = useNavigate();

    useEffect(() => {
        if (accountName === '' || accountName === null) {
            navigate('/homepage');
        }
        else {
            navigate(`/user/${accountName}`);
        }
    }, [accountName, navigate])
    return (
        <>
            <Outlet/>
        </>
    )
}


export default User;