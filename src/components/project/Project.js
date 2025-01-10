import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";
import { filterSlice, sortSlice, searchSlice } from "../../features/user/utility";
import { useSelector } from "react-redux";
import { TaskDisplay } from "../task/taskDisplay";
import CreateTaskForm from "../task/CreateTaskForm";
import { useState } from "react";
import DeleteProject from "./DeleteProject";
import { filterTask } from "../../features/task/filterTask";
import { sortTask } from "../../features/task/sortTask";
import { searchTask } from "../../features/task/searchTask";
import { splitTask } from "../../features/task/finishTask";
import { countTask } from "../../features/task/countTask";
import UpdateProject from "./UpdateProject";
import './Project.css';
import { convertFromBooleanToDisplay } from "../../app/user/User";
import deleteLogo from '../../img/user/deleteDisplay.png';
import editLogo from '../../img/user/editDisplay.png';
import infoLogo from '../../img/user/informationDisplay.png';
import arrowLink from '../../img/user/arrowLink.png';
import folder from '../../img/user/folder.png';
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, PieController, Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PieController);
Chart.register(Tooltip);


function ListProject() {
    const projects = useSelector(state => state[projectsSlice.name]);
    const tasks = useSelector(state => state[tasksSlice.name]);
    const filter = useSelector(state => state[filterSlice.name]);
    const sort = useSelector(state => state[sortSlice.name]);
    const search = useSelector(state => state[searchSlice.name]);

    const listProject = [];

    for (const project of projects) {
        const filterTasks = filterTask(tasks, project.projectName, filter);
        const searchTasks = searchTask(filterTasks, search);
        const sortTasks = sortTask(searchTasks, sort);
        const [finishedTask, unfinishedTask] = splitTask(sortTasks);
        const [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] = countTask(filterTasks);
        const listTask = [];
        const finishedListTask = [];
        //console.log(numOfPendingTask);
        for (const task of unfinishedTask) {
            listTask.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }
        for (const task of finishedTask) {
            finishedListTask.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }

        listProject.push(<Project 
            key={project.projectName} 
            listTask={listTask} 
            finishedListTask={finishedListTask} 
            project={project}
            numOfPendingTask={numOfPendingTask}
            numOfFulfilledTask={numOfFulfilledTask}
            numOfFailingTask={numOfFailingTask}
            />);
    }

    return (
        <>
            <ul id="projectList">
                {listProject}
            </ul>
        </>
    );
}

function Project(props) {
    const { listTask, project, finishedListTask, numOfFailingTask, numOfFulfilledTask, numOfPendingTask } = props;
    const { projectName, projectDescription, projectTimeCreated } = project;
    const [infoDisplay, setInfoDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [projectDescriptionDisplay, setProjectDescriptionDisplay] = useState(false);
    const [taskListDisplay, setTaskListDisplay] = useState(true);

    const accountName = localStorage.getItem("accountName");   

    const onClickEdit = () => { setEditDisplay(true); };
    const onClickDelete = () => { setDeleteDisplay(true); };

    const onClickDisplayProjectInfo = () => { 
        setEditDisplay(false);
        setDeleteDisplay(false)
        setInfoDisplay(!infoDisplay);
    };
    const onClickTaskListDisplay = () => {
        setTaskListDisplay(!taskListDisplay);
    }

    const onClickProjectDescriptionDisplay = () => {
        if (infoDisplay === true && projectDescriptionDisplay === true) {
            setInfoDisplay(false);
            setProjectDescriptionDisplay(false);
            return;
        }
        else if (infoDisplay === false) {
            setInfoDisplay(true);
        }
        setProjectDescriptionDisplay(true);
        setEditDisplay(false);
        setDeleteDisplay(false);
    }

    const onClickEditDisplay = () => {
        if (infoDisplay === true && editDisplay === true) {
            setInfoDisplay(false);
            setEditDisplay(false);
            return;
        }
        else if (infoDisplay === false) {
            setInfoDisplay(true);
        }
        setEditDisplay(true);
        setProjectDescriptionDisplay(false);
        setDeleteDisplay(false);
    }

    const onClickDeleteDisplay = () => {
        if (infoDisplay === true && deleteDisplay === true) {
            setInfoDisplay(false);
            setDeleteDisplay(false);
            return;
        }
        else if (infoDisplay === false) {
            setInfoDisplay(true);
        }
        setDeleteDisplay(true);
        setProjectDescriptionDisplay(false);
        setEditDisplay(false);
    }

    return (
        <>
            <li className="project">
                <div className="projectBody">
                    <div className="projectHeader">
                        <Progress numOfPendingTask={numOfPendingTask} numOfFulfilledTask={numOfFulfilledTask} numOfFailingTask={numOfFailingTask}/>
                        <h3>{projectName}</h3>
                        <div className="projectFunctionButton">
                            <img src={infoLogo} alt="Info" onClick={onClickProjectDescriptionDisplay}/>
                            <img src={editLogo} alt="Edit" onClick={onClickEditDisplay}/>
                            <img src={deleteLogo} alt="Edit" onClick={onClickDeleteDisplay}/>
                            <img src={arrowLink} alt="Close" onClick={onClickTaskListDisplay}/>
                        </div>
                    </div>
                    <div className={`projectMain ${!infoDisplay ? "hiddenProject" : "visibleProject"}`}>
                        <div className="projectDescription" style={{display: convertFromBooleanToDisplay(projectDescriptionDisplay)}}>
                            <p><span style={{fontWeight: 500}}>Project name:</span> {projectName}</p>
                            <p><span style={{fontWeight: 500}}>Project description:</span> {projectDescription}</p>
                            <p><span style={{fontWeight: 500}}>Project time created:</span> {projectTimeCreated}</p>
                        </div>
                        <UpdateProject editDisplay={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay} project={project}/>
                        <DeleteProject accountName={accountName} projectName={projectName} deleteDisplay={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
                    </div>
                </div>
                <div className={`${taskListDisplay === true ? 'visibleTaskListDisplay' : 'hideTaskListDisplay'} taskListDisplay`}>
                    <div>
                        <div className="taskList">
                            <UnfinishedTask listTask={listTask}/>
                            <FinishedTask finishedListTask={finishedListTask}/>
                        </div>
                        <CreateTaskForm projectName={projectName}/>
                    </div>
                </div>

            </li>
        </>
    );
}

function UnfinishedTask (props) {
    const { listTask } = props;
    const [listVisible, setListVisible] = useState(true);

    const onClickFinishedListTaskVisible = () => { setListVisible(!listVisible); };

    if (listTask.length === 0) {
        return <></>
    }

    return (
        <>
            <div className="listTaskHeader">
                <p className="listTaskTitle">Active</p>
                <div className="listTaskFunction">
                    <div>
                        <p className="numTask">{listTask.length}</p>
                    </div>
                    <img src={folder} alt="Open" onClick={onClickFinishedListTaskVisible}/>
                </div>
            </div>
            <ul className={listVisible ? "finishedListTaskVisible" : "finishedListTaskNonVisible"}>
                {listTask}
            </ul>
        </>

    )

}
function FinishedTask(props) {
    const {finishedListTask} = props;
    const [finishedListTaskVisible, setFinishedListTaskVisible] = useState(false);
    
    const onClickFinishedListTaskVisible = () => { setFinishedListTaskVisible(!finishedListTaskVisible); };

    if (finishedListTask.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className="listTaskHeader">
                <p className="listTaskTitle">Finished</p>
                <div className="listTaskFunction">
                    <div>
                        <p className="numTask">{finishedListTask.length}</p>
                    </div>
                    <img src={folder} alt="Open" onClick={onClickFinishedListTaskVisible}/>
                </div>
            </div>
            <ul className={finishedListTaskVisible ? "finishedListTaskVisible" : "finishedListTaskNonVisible"}>
                {finishedListTask}
            </ul>
        </>

    )
}


function Progress(props) {
    const { numOfFulfilledTask, numOfPendingTask, numOfFailingTask} = props;
    const numOfTask = numOfFulfilledTask + numOfPendingTask + numOfFailingTask;

    if (numOfTask === 0) {
        return (
            <div className="pieChartHomepage">
                <Pie
                    data={{
                        labels: [],
                        datasets: [{
                            data: [1],
                            backgroundColor: [
                                '#000',
                            ],
                            hoverOffset: 4
                        }]
                    }}
                    options={{
                        maintainAspectRatio: true,
                        events: []
                    }}
                />
            </div>
        );
    }
    /*
    const pendingPercent = Math.floor(numOfPendingTask / numOfTask * 100);
    const fulfilledPercent = Math.floor(numOfFulfilledTask / numOfTask * 100);
    const failingPercent = Math.floor(numOfFailingTask / numOfTask * 100);
    */
    return (
        <div className="pieChartHomepage">
            <Pie
                data={{
                    labels: [],
                    datasets: [{
                        data: [numOfPendingTask, numOfFulfilledTask, numOfFailingTask],
                        backgroundColor: [
                            '#FF8C00',
                            '#50C878',
                            '#FF748B'
                        ],
                        hoverOffset: 4
                    }]
                }}
                options={{
                    maintainAspectRatio: true,
                }}
            />
        </div>
    )

    /*
    return (
        <div className="progress nonEmptyProgress">
            <table>
                <tbody>
                    <tr>
                        {failingPercent !== 0 ? <td style={{width: 180 * failingPercent / 100}} className="failingProcess">{failingPercent}%</td> : <></>}
                        {pendingPercent !== 0 ? <td style={{width: 180 * pendingPercent / 100}} className="pendingProcess">{pendingPercent}%</td> : <></>}
                        {fulfilledPercent !== 0 ? <td style={{width: 180 * fulfilledPercent / 100}} className="fulfilledProcess">{fulfilledPercent}%</td> : <></>}
                    </tr>
                </tbody>
            </table>
        </div>
    );*/
    
}
export default ListProject;
