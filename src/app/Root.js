import { Outlet } from "react-router-dom";
function Root() {
    return (
        <>
            <p>This is Root page 1</p>
            <Outlet />

        </>
    )
}

export default Root;