import React, { useRef, useState } from 'react';
import './TestPage.css';
import axios from "axios"
import { useNavigate } from "react-router-dom"
const TestPage = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [SubjectErr, setSubjectErr] = useState("");
  const Title = useRef("");
  const Subject = useRef("");
  const Submit = async () => {
    const title = Title.current;
    const subject = Subject.current;
    if (title === "") {
      setTitleErr("Title cannot be empty");
      setTimeout(() => {
        setTitleErr("");
      }, 3000);
      return;
    }
    if (subject === "") {
      setSubjectErr("Subject cannot be empty");
      setTimeout(() => {
        setSubjectErr("");
      }, 3000);
      return;
    }
    await axios.post(` ${api}/create-test`, { Title: title, Subject: subject }).then((res) => {
      console.log("Test Created Successfully");
      navigate("/test-create")
    }).catch((err) => {
      console.log("Failed to create Test ");
      console.log(err);
    })
  }
  return (
    <div className="tp-home-container">
      {/* Navbar */}
      <header className="tp-navbar">
        <div className="tp-logo">Sigma<span className="tp-highlight">JEE</span></div>
        <div className="tp-nav-buttons">
          <button className="tp-nav-btn">Home</button>
          <button className="tp-nav-btn">Material</button>
          <button className="tp-nav-btn">Lectures</button>
          <button className="tp-nav-btn">Mentorship</button>
        </div>
      </header>
      {
        show && <div className="tp-overlay">
          <form className="tp-dialog-box" onSubmit={(e) => { e.preventDefault(); Submit(); }} data-aos="fade-down">
            <h2>Enter Test Details</h2>
            <input type="text" className={`tp-input-box ${titleErr?"border":"faltu"}`} placeholder="Enter title"  onChange={(e) => { Title.current = e.target.value }} />
            {titleErr && <p className="tp-err" data-aos="fade-right">{titleErr}</p>}
            <input type="text" className={`tp-input-box ${SubjectErr?"border":"faltu"}`} placeholder="Enter subject"  onChange={(e) => Subject.current = e.target.value} />
            {SubjectErr && <p className="tp-err" data-aos="fade-right">{SubjectErr}</p>}
            <button className="tp-submit-btn" type='submit'>Submit</button>
            <p className="tp-or-separator">or</p>
            <div className="tp-links">
              <a href="#" onClick={()=>{setshow(false)}}>Cancel</a>
              <span>|</span>
              <a href="#">Need Help?</a>
            </div>
          </form>
        </div>
      }
      {/* Two-column layout */}
      <div className="tp-main-layout">
        {/* Left Panel */}
        <div className="tp-left-panel">
          <div className="tp-card" data-aos="fade-up" onClick={()=>{
            navigate("/att-test");
          }}>
            <span role="img" aria-label="Attempted">🧪</span>
            <p>Attempted Tests</p>
          </div>
          <div className="tp-card" data-aos="fade-up" onClick={()=>{
            navigate("/untest");
          }}>
            <span role="img" aria-label="Unattempted">❌</span>
            <p>Unattempted Tests</p>
          </div>
          <div className="tp-card" data-aos="fade-up" onClick={()=>{setshow(true)}}>
            <span role="img" aria-label="Create">✍️</span>
            <p> Create Test</p>
          </div>
        </div>

        {/* Right Panel (Empty) */}
        <div className="tp-right-panel">
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
