import { Outlet, NavLink } from "react-router-dom";
function Root() {
    return (
        <>
            <p>This is Root page 1</p>
            <ul>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="signup">Sign up</NavLink></li>
            </ul>
            <Outlet />

        </>
    )
}

export default Root;