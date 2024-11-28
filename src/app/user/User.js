import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

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
    }, [accountName, navigate]);
    
    return (
        <>  
            <nav>
                <ul>
                    <li><NavLink to={`${accountName}`}>Homepage</NavLink></li>
                    <li><NavLink to={`${accountName}/dashboard`}>Dashboard</NavLink></li>
                    <li><NavLink to={`${accountName}/calender`}>Calender</NavLink></li>
                </ul>
            </nav>
            <Outlet/>
        </>
    )
}


export default User;