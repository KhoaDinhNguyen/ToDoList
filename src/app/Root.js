import HomePage from "./Homepage";
import { User } from "./User";

function Root() {
    const username = localStorage.getItem("username");

    if (username === "") {return <HomePage/>};

    return <User/>;

}

export default Root;