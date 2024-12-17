import Calendar from "../../components/task/Calender";
import { useSelector } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";
import { Helmet } from "react-helmet";

function UserCalendar() {
    const tasks = useSelector(state => state[tasksSlice.name]);
    
    return (
        <>
            <Helmet>
                <title>Calendar | ToDo List</title>
            </Helmet>
            <Calendar tasks={tasks}/>
        </>
    );
}

export default UserCalendar;