import { Outlet, NavLink } from "react-router-dom";

function HomePage() {
    return(
        <>
            <p>Homepage</p>
            <ul>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="signup">Sign up</NavLink></li>
            </ul>
            <Outlet />
        </>
    )
}

export default HomePage;