import { tasksSlice } from "../../features/user/databaseSlice";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Dashboard from "../../components/task/Dashboard";
import { splitTask } from "../../features/task/finishTask";
import { useState } from "react";

function UserDashboard() {
    const tasks = useSelector(state => state[tasksSlice.name]);
    const [finishedTask, unfinishedTask] = splitTask(tasks);

    return (
        <>
            <Helmet>
                <title>Dashboard | ToDo List</title>
            </Helmet>
            <Dashboard finishedTask={finishedTask} unfinishedTask={unfinishedTask}/>
        </>
    );
}

export default UserDashboard;