import { NavLink, Outlet } from "react-router-dom";

function HomePage() {
    return(
        <>
            <nav>
                <ul>
                    <li><NavLink to="aboutUs">About us</NavLink></li>
                    <li><NavLink to="login">Login</NavLink></li>
                    <li><NavLink to="signUp">SignUp</NavLink></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default HomePage;