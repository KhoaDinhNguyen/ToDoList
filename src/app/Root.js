import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Root() {
    const accountName = localStorage.getItem("accountName");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!accountName) {
            navigate('/homepage/aboutUs');
        }
        else {
            navigate(`/user/${accountName}`);
        }
    },[accountName, navigate]);
    
    return (
        <></>
    );
}   

export default Root;