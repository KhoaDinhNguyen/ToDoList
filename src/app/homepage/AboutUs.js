import { Helmet } from "react-helmet";
import './AboutUs.css';
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const navigate = useNavigate();
    return (
        <>  
            <Helmet>
                <title>About Us | ToDo List</title>
            </Helmet>
            <div id="aboutUs">
                <div id="aboutUsIntro">
                    <div id="introContent">
                        <div>
                            <h3 className="title">WHO ARE WE?</h3>
                            <h2>Master Your Day with MasterTask</h2>
                            <p>A free web-based application to help users organize their tasks, checklists efficiently and save tons of time.</p>
                            <button onClick={() => { navigate('/homepage/login')}}>Get Started</button>
                        </div>
                    </div>
                </div>
                <div id="feature">
                    <h3 className="title">FEATURES</h3>
                    <h2>Features to Satisfy Your Demands</h2>
                    <p>Unleash the power of productivity with cutting-edge features.</p>
                    <div id="featureList">
                        <div className="featureItem" id="feature1">
                            <div className="featureItemContent">
                                <div>
                                    <h4>Homepage</h4>
                                    <p>A place where users can create, update, delete tasks.</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="featureItem" id="feature2">
                            <div className="featureItemContent">
                                <div>
                                    <h4>Dashboard</h4>
                                    <p>Tasks are organized by deadline supporting users to see upcoming deadline.</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div className="featureItem" id="feature3">
                            <div className="featureItemContent" >
                                <div>
                                    <h4>Calendar</h4>
                                    <p>Users can see tasks in calendar mode providing an overall view.</p>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;