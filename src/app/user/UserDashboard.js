import { tasksSlice } from "../../features/user/databaseSlice";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Dashboard from "../../components/task/Dashboard";
import { splitTask } from "../../features/task/finishTask";
import { useState } from "react";

function UserDashboard() {
    const tasks = useSelector(state => state[tasksSlice.name]);
    const [finishedTask, unFinishedTask] = splitTask(tasks);
    const [finishedTaskVisible, setFinishedTaskVisible] = useState(false);

    return (
        <>
            <Helmet>
                <title>Dashboard | ToDo List</title>
            </Helmet>
            <Dashboard tasks={finishedTaskVisible ? tasks : unFinishedTask} finishedTaskVisible={finishedTaskVisible} setFinishedTaskVisible={setFinishedTaskVisible}/>
        </>
    );
}

export default UserDashboard;