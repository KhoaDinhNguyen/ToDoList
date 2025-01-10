import { TaskDisplay } from "./taskDisplay";
import './Dashboard.css';
import { useState } from "react";
import { convertFromBooleanToDisplay, convertDateToISOString } from "../../app/user/User";
import { Bar, Pie } from "react-chartjs-2";
import { sortTask } from "../../features/task/sortTask";
import {Chart, ArcElement, CategoryScale, LinearScale, BarElement, Title, PieController, Tooltip, Legend} from 'chart.js'
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(BarElement);
Chart.register(Title);
Chart.register(PieController);
Chart.register(Tooltip);
Chart.register(Legend);

function Dashboard(props) {
    const { finishedTask, unfinishedTask } = props;

    const today = new Date();    
    const todayString = convertDateToISOString(today);

    const todayTask = unfinishedTask.filter(task => task.taskTimeDeadline === todayString);
    const upcommingTask = unfinishedTask.filter(task => task.taskTimeDeadline > todayString);

    const numFinishedTask = finishedTask.length;
    const numUnfinishedTask = unfinishedTask.length;
    const totalNumTask = numUnfinishedTask + numFinishedTask;
    const numPendingTask = unfinishedTask.filter(task => task.taskStatus === 'pending').length;
    const numFailingTask = finishedTask.filter(task => task.taskStatus === 'failing').length;
    const numFulfilledTask = totalNumTask - numFailingTask - numPendingTask;

    return (
        <>
            <div className="pageActive">
                <p>To-do List Application</p>
                <h2>Dashboard</h2>
            </div>
            <div id="dashboard">
                <TodayTask todayTask={todayTask}/>
                <UpcomingTask upcommingTask={upcommingTask}/>
                <Statistic totalNumTask={totalNumTask} numFinishedTask={numFinishedTask} numUnfinishedTask={numUnfinishedTask} numPendingTask={numPendingTask} numFailingTask={numFailingTask} numFulfilledTask={numFulfilledTask}/>
                <DashboardChart totalNumTask={totalNumTask} numFinishedTask={numFinishedTask} numUnfinishedTask={numUnfinishedTask} numPendingTask={numPendingTask} numFailingTask={numFailingTask} numFulfilledTask={numFulfilledTask}/>
            </div>
        </>
    );
}

function TodayTask(props) {
    const { todayTask } = props;

    if (todayTask.length === 0) {
        return (
            <div id="todayTask">
                <h2>Today</h2>
                <p>Nothing need to do</p>
            </div>
        )
    }
    const todayTaskList = [];

    for (const task of todayTask) {
        const { projectName, taskName} = task;
        todayTaskList.push(<TaskDisplay key={`${projectName}${taskName}`} task={task} type="dashboard" today={true}/>)
    }

    return (
        <div id="todayTask">
            <h2>Today</h2>
            <ul>
                {todayTaskList}
            </ul>
        </div>
    )
}

function UpcomingTask(props) {
    const { upcommingTask } = props;

    if (upcommingTask.length === 0) {
        return (
            <div id="upcommingTask">
                <h2>Upcomming task</h2>
                <p>Nothing need to do</p>
            </div>
        )
    }
    const upcommingTaskList = [];
    const upcommingTaskSort = sortTask(upcommingTask, {sortTimeCreated: undefined, sortTaskName: undefined, sortTimeDeadline: true});

    for (const task of upcommingTaskSort) {
        const { projectName, taskName} = task;
        upcommingTaskList.push(<TaskDisplay key={`${projectName}${taskName}`} task={task} type="dashboard" today={false}/>)
    }
    
    return (
        <div id="upcommingTask">
            <h2>Upcomming task</h2>
            <ul>
                {upcommingTaskList}
            </ul>
        </div>
    )
}

function Statistic(props) {
    const { totalNumTask, numFinishedTask, numUnfinishedTask, numPendingTask, numFailingTask, numFulfilledTask } = props;

    
    return (
        <div id="statistic">
            <div id="totalNumTask">
                <h3>Total task:</h3>
                <p>{totalNumTask}</p>
            </div>
            <div id="numUnfinishedTask">
                <h3># Unfinished</h3>
                <p>{numUnfinishedTask}</p>
            </div>
            <div id="numFinishedTask">
                <h3># Finished</h3>
                <p>{numFinishedTask}</p>
            </div>
            <div id="numPendingTask">
                <h3># Pending</h3>
                <p>{numPendingTask}</p>
            </div>
            <div id="numFulfilledTask">
                <h3># Fulfilled</h3>
                <p>{numFulfilledTask}</p>
            </div>
            <div id="numFailingTask">
                <h3># Failing</h3>
                <p>{numFailingTask}</p>
            </div>
        </div>
    )
}


function DashboardChart(props) {
    const { totalNumTask, numFinishedTask, numUnfinishedTask, numPendingTask, numFailingTask, numFulfilledTask } = props;
    
    const plugin = {
        id: 'customCanvasBackgroundColor',
        beforeDraw: (chart, args, options) => {
            const {ctx} = chart;
            ctx.save();
            ctx.globalCompositeOperation = 'destination-over';
            ctx.fillStyle = options.color || '#99ffff';
            ctx.fillRect(0, 0, chart.width, chart.height);
            ctx.restore();
        }
    };

    return (
        <div id="chart">
            <div id="barChart">
                <Bar data ={
                    {
                        labels: ['Total task', 'Finished task', 'Unfinished task'],
                        datasets: [{
                        label: 'Task',
                        data: [totalNumTask, numFinishedTask, numUnfinishedTask],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgb(255, 99, 132)',
                            'rgb(255, 159, 64)',
                            'rgb(255, 205, 86)',
                        ],
                        borderWidth: 1
                        }]
                    }
                    
                }
                
                options={{
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: '#fff',
                        },
                        title: {
                            display: true,
                            text: 'Task number'
                        }
                    },
                    maintainAspectRatio: true
                }}
                plugins={[plugin]}
                />
            </div>

            <div id="pieChart">
                <Pie data={
                    {
                        labels: [
                            'Pending',
                            'Fulfilled',
                            'Failing'
                        ],
                        datasets: [{
                        label: 'My First Dataset',
                        data: [numPendingTask, numFulfilledTask, numFailingTask],
                        backgroundColor: [
                            '#FF8C00',
                            '#50C878',
                            '#FF748B'
                        ],
                        hoverOffset: 4,
                        }]
                    }
                }
                options={{
                    plugins: {
                        customCanvasBackgroundColor: {
                        color: '#fff',
                        },
                        title:{
                            display: true,
                            text: 'Percentage of task status'
                        }
                    },
                    maintainAspectRatio: true
                }}
                plugins={[plugin]}
                />
            </div>

        </div>
    );
}


export default Dashboard;
