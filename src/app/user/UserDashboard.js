import { tasksSlice } from "../../features/user/databaseSlice";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Dashboard from "../../components/task/Dashboard";

function UserDashboard() {
    const tasks = useSelector(state => state[tasksSlice.name]);

    return (
        <>
            <Helmet>
                <title>Dashboard | ToDo List</title>
            </Helmet>
            <Dashboard tasks={tasks}/>
        </>
    );
}

export default UserDashboard;