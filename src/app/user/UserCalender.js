import Calender from "../../components/task/Calender";
import { useSelector } from "react-redux";
import { tasksSlice } from "../../features/user/databaseSlice";

function UserCalender() {
    const tasks = useSelector(state => state[tasksSlice.name]);
    
    return (
        <>
            <Calender tasks={tasks}/>
        </>
    );
}

export default UserCalender;