import { Helmet } from "react-helmet";
import './AboutUs.css';
import { NavLink } from "react-router-dom";

function AboutUs() {
    return (
        <>  
            <Helmet>
                <title>About Us | ToDo List</title>
            </Helmet>
            <div id="aboutUs">
                <div id="aboutUsIntro">
                    <h2>MasterTask</h2>
                    <p>Too many tasks to handle?<span>&#128534;</span></p>
                    <p>Sign up now to relieve the stress of managing them<span>&#128516;</span></p>
                </div>
                <div id="aboutUsMain">
                    <div>
                        <h3>Who are we?</h3>
                        <p>MasterTask is a free web-based application to help users organize their tasks, checklists efficiently and save tons of time.</p>
                        <h3>Features</h3>
                        <p>An application has three modes:</p>
                        <ul>
                            <li><span>Homepage</span>: A place where users can create, update, delete tasks.</li>
                            <li><span>Dashboard</span>: Tasks are organized by deadline supporting users to see upcoming deadline.</li>
                            <li><span>Calendar</span>: Users can see tasks in calendar mode providing an overall view.</li>
                        </ul>
                        <h3>How to use?</h3>
                        <p><NavLink to="/homepage/signUp">Create an account</NavLink> or <NavLink to="/homepage/login">Login</NavLink> to enjoy the application.</p>
                        <div id="aboutUsMessage">
                            <h4>Organize tasks can take a lot of time.</h4>
                            <h4>Let's MasterTask help you.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;