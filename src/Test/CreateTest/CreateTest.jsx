import React, { useEffect, useRef, useState } from 'react';
import './CreateTest.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
const CreateTest = () => {
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API;
    const safeJSONParse = (key, fallback) => {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : fallback;
        } catch (e) {
            return fallback;
        }
    };
    const length = useRef(10);
    const dur = useRef(10);
    const [durdis, setdurdis] = useState(safeJSONParse("durdis", false));
    const [lendis, setlendis] = useState(safeJSONParse("lendis", false));
    const [savelen, setsavelen] = useState(safeJSONParse("savelen", 10));
    const [duration, setduration] = useState(safeJSONParse("duration", 10));
    const [len, setlen] = useState(safeJSONParse("len", 10));
    const [Statements, setStatements] = useState(safeJSONParse("statements", Array.from({ length: 100 }).fill("")));
    const [Answers, setAnswers] = useState(safeJSONParse("answers", Array.from({ length: 100 }).fill(0)));
    const [Options, setOptions] = useState(safeJSONParse("options", Array.from({ length: 100 }).fill(["", "", "", ""])));
    const [Saved, setSaved] = useState(safeJSONParse("saved", Array.from({ length: 100 }).fill(false)));
    const [SelectedOptions, setSelectedOptions] = useState(
        safeJSONParse("selected-options", Array.from({ length: 100 }).map(() => [false, false, false, false]))
    );

    useEffect(() => {
        localStorage.setItem("lendis", JSON.stringify(lendis));
    }, [lendis]);
    useEffect(() => {
        localStorage.setItem("durdis", JSON.stringify(durdis));
    }, [durdis]);
    useEffect(() => {
        localStorage.setItem("duration", JSON.stringify(duration));
    }, [duration]);
    useEffect(() => {
        localStorage.setItem("statements", JSON.stringify(Statements));
    }, [Statements]);

    useEffect(() => {
        localStorage.setItem("answers", JSON.stringify(Answers));
    }, [Answers]);

    useEffect(() => {
        localStorage.setItem("options", JSON.stringify(Options));
    }, [Options]);

    useEffect(() => {
        localStorage.setItem("saved", JSON.stringify(Saved));
    }, [Saved]);

    useEffect(() => {
        localStorage.setItem("len", JSON.stringify(len));
    }, [len]);

    useEffect(() => {
        localStorage.setItem("selected-options", JSON.stringify(SelectedOptions));
    }, [SelectedOptions]);
    useEffect(() => {
        localStorage.setItem("savelen", JSON.stringify(savelen));
    }, [savelen]);
    const Save = (qindex) => {
        const statement = Statements[qindex];
        const options = Options[qindex];
        const selectedOptions = SelectedOptions[qindex];
        if (statement === "") {
            return;
        }
        if (options.some(option => option === "")) {
            return;
        }
        if (!selectedOptions.includes(true)) return;
        const saved = [...Saved];
        saved[qindex] = true;
        setSaved(saved);
        const answers = [...Answers];
        answers[qindex] = SelectedOptions[qindex].findIndex(sel => sel === true) + 1;
        setAnswers(answers);
    }
    const EditStatements = (e, qIndex) => {
        const States = [...Statements];
        States[qIndex] = e.target.value;
        setStatements(States);
    };
    const EditOptions = (e, qindex, optIndex) => {
        const options = [...Options];
        const opt = [...options[qindex]]
        opt[optIndex] = e.target.value;
        options[qindex] = opt;
        setOptions(options);
    }
    const SetLength = (e) => {
        length.current = e.target.value;
        setsavelen(e.target.value);
    };
    const SetDuration = (e) => {
        dur.current = e.target.value;
        setduration(e.target.value);
    }
    const OnSaveDuration = (e) => {
        setdurdis(true);
        setduration(dur.current >= 10 ? dur.current : 10);
    }
    const OnSaveLength = () => {
        setlendis(true);
        setlen(length.current >= 10 ? length.current : 10);
    };

    const SelectOption = (qindex, optIndex) => {
        if (Saved[qindex]) return;
        const quesOptions = [...SelectedOptions];
        const newState = [false, false, false, false];
        if (!SelectedOptions[qindex][optIndex]) {
            newState[optIndex] = true;
        }
        quesOptions[qindex] = newState;
        setSelectedOptions(quesOptions);
    };
    const UndoSave = (qindex) => {
        const saved = [...Saved];
        saved[qindex] = false;
        setSaved(saved);
    }
    const FinalSubmit = async () => {
        const userId=localStorage.getItem("userId");
        console.log(userId);
        
        const id=localStorage.getItem("testId");
        console.log(id);
        try {
            await axios.post(`${api}/edit-paper`, { Statements, Saved, Options, Answers, duration,userId,id });
            console.log("Tp Created ");
            navigate("/test-page");
        } catch (error) {
            console.log("Failed to Create Tp");
            console.log(error);
        }
    }

    return (
        <div>
         <div className="hm-navbar">
        <div className="hm-logo">
          Sigma<span className="hm-logo-highlight">JEE</span>
        </div>
        <div className="hm-nav-btns">
          <div className="hm-desk-navbar-buttons">
            <button className="hm-desk-nav-btn"onClick={() => {
                setshow(prev => !prev)
              }}>Home</button>
            <button className="hm-desk-nav-btn" onClick={() => navigate("/test-page")}>Test Papers</button>
            <button className="hm-desk-nav-btn">Live Lectures</button>
            <button className="hm-desk-nav-btn">Study Material</button>
            <button className="hm-desk-nav-btn">Classes</button>
            <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Profile Icon" className="hm-profile-icon" />
          </div>

          <div className="hm-mobile-icons">
            <div onClick={() => {
               console.log("Clicked"); // ✅ test
                setshow(prev => !prev)
              }}
             >
              <img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="Profile Icon"    className="hm-profile-icon" />
            </div>

            <img src="https://cdn-icons-png.flaticon.com/512/56/56763.png" alt="Hamburger" onClick={() => {
              setshow(prev => !prev);
            }} className="hm-hamburger-icon" />
          </div>

        </div>

        {/* Mobile-only icons */}

      </div>
            <div className="ct-container">
                <div className="ct-left-panel">
                    <div className="ct-form-group">
                        <label>Number of Questions</label>
                        <input value={savelen} type="number" placeholder="10-100" disabled={lendis} onChange={(e) => { SetLength(e) }} />
                        <div>
                            <button onClick={OnSaveLength}>Save</button>
                            <button onClick={() => { setlendis(false) }}>Edit</button>
                        </div>
                    </div>
                    <div className="ct-form-group">
                        <label>Duration (mins)</label>
                        <input type="number" disabled={durdis} value={duration} placeholder="e.g. 60" onChange={(e) => { SetDuration(e) }} />
                        <div>
                            <button onClick={OnSaveDuration}>Save</button>
                            <button onClick={() => { setdurdis(false) }}>Edit</button>
                        </div>
                    </div>

                    <div className="ct-questions">
                        {Array.from({ length: 50 }).map((_, qindex) => (
                            <div className={`ct-question-boxes display ${Saved[qindex] ? "ct-green" : "faltu"}`} key={qindex}>
                                {qindex <= len - 1 ? qindex + 1 : "N"}
                            </div>
                        ))}
                    </div>
                    <div className="ct-form-group">
                        <button style={{ width: '100%' }} onClick={FinalSubmit}>Create Test</button>
                    </div>
                </div>

                <div className="ct-right-panel">
                    {
                        Array.from({ length: len }).map((_, qindex) => (
                            <div className="ct-question-card" key={qindex}>
                                <div className="ct-question-num">Q {qindex + 1}</div>
                                <textarea placeholder="Enter question statement" disabled={Saved[qindex]} value={Statements[qindex]} onChange={(e) => { EditStatements(e, qindex) }} />

                                {['A', 'B', 'C', 'D'].map((opt, optIndex) => (
                                    <div key={optIndex} className="ct-option-row">
                                        <div
                                            className={`ct-simple-box ${SelectedOptions[qindex][optIndex] ? "ct-grey" : "faltu"}`}
                                            onClick={() => { SelectOption(qindex, optIndex) }}
                                        ></div>
                                        <input type="text" disabled={Saved[qindex]} value={Options[qindex][optIndex]} placeholder={`Option ${opt}`} onChange={(e) => { EditOptions(e, qindex, optIndex) }} />
                                    </div>
                                ))}

                                <button onClick={() => Save(qindex)}>Save</button>
                                <button onClick={() => {
                                    UndoSave(qindex);
                                }}>Edit</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default CreateTest;
