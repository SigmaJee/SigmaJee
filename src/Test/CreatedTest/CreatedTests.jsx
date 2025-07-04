import React, { useEffect, useState } from 'react';
import './CreatedTests.css';
import axios from 'axios';
import Cookies from "js-cookie"
const CreatedTests = () => {
   
    const [CreatedTests, setCreatedTests] = useState(() => {
        const stored = localStorage.getItem("created");
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
         const api=import.meta.env.VITE_API;
         const user=JSON.parse(sessionStorage.getItem("user"))
        const FetchData = async () => {
            await axios.post(`${api}/get-created-test`,{user}).then((res) => {
                setCreatedTests(res.data.created);
            }).catch((err) => {
                console.log(err);
            })
        }
        FetchData();
    }, [])
    useEffect(() => {
        localStorage.setItem("created", JSON.stringify(CreatedTests));
    }, [CreatedTests]);

    const downloadPDF = async (paperData) => {
        const response = await axios.post(`${api}/get-pdf`, { paperData }, {
            responseType: "blob",
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TestPaper.pdf");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            {/* ✅ NAVBAR */}
            <div className="ctd-navbar">
                <div className="ctd-logo">
                    Sigma<span>JEE</span>
                </div>
                <div className="ctd-nav-btns">
                    <div className="ctd-nav-btn">Home</div>
                    <div className="ctd-nav-btn">Tests</div>
                    <div className="ctd-nav-btn">Materials</div>
                </div>
            </div>

            {/* ✅ CONTENT BLOCK */}
            <div className="ctd-container">

                {/* 🧪 TEST + GRAPH BLOCK */}

                {CreatedTests.map((test, id) => (
                    <div className="ctd-test-block" key={id}>

                        {/* ✅ LEFT CARD */}
                        <div className="ctd-test-card">
                            <div className="ctd-left-info">
                                <h3>{test.Title}</h3>
                                <div>Duration: {test.Duration}</div>
                                <div className="ctd-nav-btn" onClick={() => { downloadPDF(test) }}>Download PDF</div>
                                <div className="ctd-nav-btn" onClick={async () => {
                                    const url = `https://sigmajeeoff.netlify.app/test-screen?test-id=${test._id}`;
                                    const message = `Someone has set a test paper for you on SigmaJEE.\nClick the link to attempt it:\n${url}`;
                                    const encoded=encodeURIComponent(message);
                                    window.open(`https://wa.me?text=${encoded}`,"_blank");
                                }}
                                >Share</div>
                            </div>
                            <div className="ctd-right-info">
                                Total Qs: {test.Questions.length}<br />
                                Marks Scored:{test.Avg} <br />
                                Avg Time/Question: 2.3 mins
                            </div>
                        </div>

                        {/* 📊 RIGHT GRAPH BOX */}
                        <div className="ctd-graph-box">
                            <p>Graph for Avg Time per Question</p>
                        </div>
                    </div>

                ))
                }

                {/* Add more .ctd-test-block for additional test records */}
            </div>
        </div>
    );
};

export default CreatedTests;
