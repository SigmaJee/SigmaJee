import React from 'react';
import "./Untest.css"
import { TestAuth } from '../TestContext/TestContext';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
const Untest = () => {
    const navigate = useNavigate();
    const { Unattempted, settrig } = TestAuth();
    const Attempt = (testid) => {
        console.log(testid);
        
        axios.post("api/user/attempt", { testid },{ withCredentials: true }).then((res) => {
            console.log("Marked as Attempted");
            settrig(prev => !prev);
            navigate("/test-screen");
        }).catch(err => {
            console.log(err);
            console.log(err.response.data.message);
            
        })
    }

    return (
        <div className="pg">


            <header className="tl-navbar">
                <div className="tl-logo">Sigma<span>JEE</span></div>
                <div className="tl-nav-buttons">
                    <button>Home</button>
                    <button>Material</button>
                    <button>Lectures</button>
                    <button>Mentorship</button>
                </div>
            </header>


            <div className="tl-layout">


                <div className="tl-sidebar">
                    <div className="tl-sidebar-links">
                        <a href="#">Home</a>
                        <a href="#">Material</a>
                        <a href="#">Lectures</a>
                        <a href="#">Mentorship</a>
                    </div>
                </div>
                <div className="tl-content">
                    {Unattempted.map((test, index) => (

                        <div className="tl-card" key={index}>
                            <div className="tl-card-left">
                                <h3>{test.Title}</h3>
                                <p>{test.Duration}</p>
                            </div>
                            <div className="tl-card-center">
                                <button onClick={()=>Attempt(test._id)}>Attempt</button>
                            </div>
                            <div className="tl-card-right">
                                <span>Avg:{test.Avg}</span>

                                <span> Attempts:{test.Attempts}</span>
                            </div>
                        </div>

                    ))
                    }
                </div>



            </div>
        </div>
    );
};

export default Untest;