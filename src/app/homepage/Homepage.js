import { NavLink, Outlet } from "react-router-dom";

function HomePage() {
    return(
        <>
            <ul>
                <li><NavLink to="aboutUs">About us</NavLink></li>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="signUp">SignUp</NavLink></li>
            </ul>
            <Outlet />
        </>
    );
}

export default HomePage;