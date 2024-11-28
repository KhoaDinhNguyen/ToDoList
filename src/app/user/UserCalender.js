import Calender from "../../components/task/Calender";
import { useSelector } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import { Helmet } from "react-helmet";

function UserCalender() {
    const tasks = useSelector(state => state[tasksSlice.name]);
    
    return (
        <>
            <Helmet>
                <title>Calender | ToDo List</title>
            </Helmet>
            <Calender tasks={tasks}/>
        </>
    );
}

export default UserCalender;