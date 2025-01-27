/*
    Libraries
*/
import { useSelector } from "react-redux";
import { useState } from "react";

/*
    Components
*/
import UpdateProject from "./UpdateProject";
import DeleteProject from "./DeleteProject";
import CreateTaskForm from "../task/CreateTaskForm";
import { TaskDisplay } from "../task/taskDisplay";

/*
    Slices
*/
import { projectsSlice, tasksSlice } from "../../features/user/databaseSlice";
import { searchSlice, sortTaskNameSlice, sortTimeCreatedSlice, sortTimeDeadlineSlice, filterStatusSlice, filterImportantSlice, filterTimeCreatedFromSlice, filterTimeCreatedToSlice, filterTimeDeadlineFromSlice, filterTimeDeadlineToSlice } from "../../features/user/utility";

/* 
    Helper functions
*/

import { filterTask } from "../../features/task/filterTask"; // filterTask(tasks, filterProjectName, filterStatus : [string], filterImportant : boolean, filterTimeCreatedFrom : string, filterTimeCreatedTo : string, filterTimeDeadlineFrom : string, filterTimeDeadlineTo : string) -> tasks
import { sortTask } from "../../features/task/sortTask"; // sortTask(tasks, sortTaskName : boolean, sortTimeCreated: boolean, sortTimeDeadline : boolean) -> tasks
import { searchTask } from "../../features/task/searchTask"; // searchTask(tasks, searchString : string) -> tasks;
import { splitTask } from "../../features/task/finishTask"; // splitTask(tasks) -> [finishedTasks, unfinishedTasks]
import { countTask } from "../../features/task/countTask"; // countTask(tasks) -> [numOfPendingTask: int, numOfFailingTask: int, numOfPendingTask: int]
import { convertFromBooleanToDisplay } from "../../app/user/User"; // convertFromBooleanToDisplat(boolean) -> ("none" || "block")

/*
    Images source
*/
import deleteLogo from '../../img/user/deleteDisplay.png';
import editLogo from '../../img/user/editDisplay.png';
import infoLogo from '../../img/user/informationDisplay.png';
import arrowLink from '../../img/user/arrowLink.png';
import folder from '../../img/user/folder.png';

/*
    Chart.js
*/
import { Pie } from "react-chartjs-2";
import {Chart, ArcElement, CategoryScale, LinearScale, PieController, Tooltip} from 'chart.js'
/*
    Stylesheet
*/
import './Project.css';

Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PieController);
Chart.register(Tooltip);


function ProjectList() {
    const projects = useSelector(state => state[projectsSlice.name]);
    const tasks = useSelector(state => state[tasksSlice.name]);
    /*
        filter slices
    */
    const filterStatus = useSelector(state => state[filterStatusSlice.name]);
    const filterImportant = useSelector(state => state[filterImportantSlice.name]);
    const filterTimeCreatedFrom = useSelector(state => state[filterTimeCreatedFromSlice.name]);
    const filterTimeCreatedTo = useSelector(state => state[filterTimeCreatedToSlice.name]);
    const filterTimeDeadlineFrom = useSelector(state => state[filterTimeDeadlineFromSlice.name]);
    const filterTimeDeadlineTo = useSelector(state => state[filterTimeDeadlineToSlice.name]);

    /*
        sort slices
    */
    const sortTaskName = useSelector(state => state[sortTaskNameSlice.name]);
    const sortTimeCreated = useSelector(state => state[sortTimeCreatedSlice.name]);
    const sortTimeDeadline = useSelector(state => state[sortTimeDeadlineSlice.name]);

    /*
        serach slices
    */
    const search = useSelector(state => state[searchSlice.name]);

    const listProjectRender = [];

    for (const project of projects) {
        const { projectName } = project;
        const filterTasks = filterTask(tasks, projectName, filterStatus, filterImportant, filterTimeCreatedFrom, filterTimeCreatedTo, filterTimeDeadlineFrom, filterTimeDeadlineTo);
        const searchTasks = searchTask(filterTasks, search);
        const sortTasks = sortTask(searchTasks, sortTaskName, sortTimeCreated, sortTimeDeadline);
        const [finishedTasks, unfinishedTasks] = splitTask(sortTasks);
        const [numOfPendingTask, numOfFulfilledTask, numOfFailingTask] = countTask(filterTasks);
        
        const [unfinishedTasksRender, finishedTasksRender] = [[], []];

        for (const task of unfinishedTasks) {
            unfinishedTasksRender.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }
        for (const task of finishedTasks) {
            finishedTasksRender.push(<TaskDisplay key={`${project.projectName}${task.taskName}`} task={task}/>);
        }

        listProjectRender.push(<Project 
            key={projectName} 
            unfinishedTasksRender={unfinishedTasksRender} 
            finishedTasksRender={finishedTasksRender} 
            project={project}
            numOfPendingTask={numOfPendingTask}
            numOfFulfilledTask={numOfFulfilledTask}
            numOfFailingTask={numOfFailingTask}
        />);
    }

    return (
        <ul id="listProject">
            {listProjectRender}
        </ul>
    );
}

function Project(props) {
    const { unfinishedTasksRender, project, finishedTasksRender, numOfFailingTask, numOfFulfilledTask, numOfPendingTask } = props;
    const [projectExpansionDisplay, setProjectExpansionDisplay] = useState(false);
    const [editDisplay, setEditDisplay] = useState(false);
    const [deleteDisplay, setDeleteDisplay] = useState(false);
    const [projectDescriptionDisplay, setProjectDescriptionDisplay] = useState(false);
    const [taskListDisplay, setTaskListDisplay] = useState(true);
    const { projectName } = project;
    const accountName = localStorage.getItem("accountName");

    const onClickTaskListDisplay = () => {
        setTaskListDisplay(!taskListDisplay);
    }

    const onClickProjectDescriptionDisplay = () => {
        if (projectExpansionDisplay === true && projectDescriptionDisplay === true) {
            setProjectExpansionDisplay(false);
        }
        else {
            setProjectExpansionDisplay(true);
            setProjectDescriptionDisplay(true);
            setEditDisplay(false);
            setDeleteDisplay(false);
        }
    }

    const onClickEditDisplay = () => {
        if (projectExpansionDisplay === true && editDisplay === true) {
            setProjectExpansionDisplay(false);
        }
        else {
            setProjectExpansionDisplay(true);
            setEditDisplay(true);
            setProjectDescriptionDisplay(false);
            setDeleteDisplay(false);
        }
    }

    const onClickDeleteDisplay = () => {
        if (projectExpansionDisplay === true && deleteDisplay === true) {
            setProjectExpansionDisplay(false);
        }
        else {
            setProjectExpansionDisplay(true);
            setDeleteDisplay(true);
            setProjectDescriptionDisplay(false);
            setEditDisplay(false);
        }

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
                    <div className={`projectMain ${!projectExpansionDisplay ? "hiddenProjectExpansion" : "visibleProjectExpansion"}`}>
                        <ProjectDescription project={project} projectDescriptionDisplay={projectDescriptionDisplay}/>
                        <UpdateProject editDisplay={convertFromBooleanToDisplay(editDisplay)} setEditDisplay={setEditDisplay} project={project}/>
                        <DeleteProject accountName={accountName} projectName={projectName} deleteDisplay={convertFromBooleanToDisplay(deleteDisplay)} setDeleteDisplay={setDeleteDisplay}/>
                    </div>
                </div>
                <div className={`${taskListDisplay ? 'visibleTaskListDisplay' : 'hideTaskListDisplay'} taskListDisplay`}>
                    <div>
                        <div className="taskList">
                            <UnfinishedTask unfinishedTasksRender={unfinishedTasksRender}/>
                            <FinishedTask finishedTasksRender={finishedTasksRender}/>
                        </div>
                        <CreateTaskForm projectName={projectName}/>
                    </div>
                </div>

            </li>
        </>
    );
}

function ProjectDescription(props) {
    const { project, projectDescriptionDisplay } = props;
    const { projectName, projectDescription, projectTimeCreated } = project;

    return (
        <div className="projectDescription" style={{display: convertFromBooleanToDisplay(projectDescriptionDisplay)}}>
            <p><span style={{fontWeight: 500}}>Project name:</span> {projectName}</p>
            <p><span style={{fontWeight: 500}}>Project description:</span> {projectDescription}</p>
            <p><span style={{fontWeight: 500}}>Project time created:</span> {projectTimeCreated}</p>
        </div>
    );
}

function UnfinishedTask (props) {
    const { unfinishedTasksRender } = props;
    const [listVisible, setListVisible] = useState(true);

    const onClickFinishedListTaskVisible = () => { setListVisible(!listVisible); };

    if (unfinishedTasksRender.length === 0) {
        return <></>
    }

    return (
        <>
            <div className="listTaskHeader">
                <p className="listTaskTitle">Active</p>
                <div className="listTaskFunction">
                    <div>
                        <p className="numTask">{unfinishedTasksRender.length}</p>
                    </div>
                    <img src={folder} alt="Open" onClick={onClickFinishedListTaskVisible}/>
                </div>
            </div>
            <ul className={listVisible ? "finishedListTaskVisible" : "finishedListTaskNonVisible"}>
                {unfinishedTasksRender}
            </ul>
        </>

    )

}
function FinishedTask(props) {
    const {finishedTasksRender} = props;
    const [finishedListTaskVisible, setFinishedListTaskVisible] = useState(false);
    
    const onClickFinishedListTaskVisible = () => { setFinishedListTaskVisible(!finishedListTaskVisible); };

    if (finishedTasksRender.length === 0) {
        return <></>;
    }

    return (
        <>
            <div className="listTaskHeader">
                <p className="listTaskTitle">Finished</p>
                <div className="listTaskFunction">
                    <div>
                        <p className="numTask">{finishedTasksRender.length}</p>
                    </div>
                    <img src={folder} alt="Open" onClick={onClickFinishedListTaskVisible}/>
                </div>
            </div>
            <ul className={finishedListTaskVisible ? "finishedListTaskVisible" : "finishedListTaskNonVisible"}>
                {finishedTasksRender}
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
}
export default ProjectList;
