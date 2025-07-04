import React from "react";
import "./TestPage.css";
import { useState,useRef } from "react";
import {useNavigate} from "react-router-dom"
import RightSidebar from "../../Home/HmSidebar";
import axios from "axios";
const TestPage = () => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const [show, setshow] = useState(false);
  const [titleErr, setTitleErr] = useState("");
  const [SubjectErr, setSubjectErr] = useState("");
  const [showbox,setshowbox]=useState(false);
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
    await axios.post(`${api}/create-test`, { Title: title, Subject: subject }).then((res) => {
      console.log("Test Created Successfully");
      navigate("/test-create")
    }).catch((err) => {
      console.log("Failed to create Test ");
      console.log(err);
    })
  }
  return (
    <div className="tp-pg">
      {show&&<RightSidebar el={{setshow}} />}
       {
        showbox && <div className="tp-overlay">
          <form className="tp-dialog-box" onSubmit={(e) => { e.preventDefault(); Submit(); }} data-aos="fade-down">
            <h2>Enter Test Details</h2>
            <input type="text" className={`tp-input-box ${titleErr?"border":"faltu"}`} placeholder="Enter title"  onChange={(e) => { Title.current = e.target.value }} />
            {titleErr && <p className="tp-err" data-aos="fade-right">{titleErr}</p>}
            <input type="text" className={`tp-input-box ${SubjectErr?"border":"faltu"}`} placeholder="Enter subject"  onChange={(e) => Subject.current = e.target.value} />
            {SubjectErr && <p className="tp-err" data-aos="fade-right">{SubjectErr}</p>}
            <button className="tp-submit-btn" type='submit'>Submit</button>
            <p className="tp-or-separator">or</p>
            <div className="tp-links">
              <a href="#" onClick={()=>{setshowbox(false)}}>Cancel</a>
              <span>|</span>
              <a href="#">Need Help?</a>
            </div>
          </form>
        </div>
      }
      {/* ✅ NAVBAR */}
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

      {/* ✅ UPPER SECTION */}
      <div className="tp-upper-section">
        <div className="tp-left-section">
          {/* Explore Card */}
          <div className="tp-test-card">
            <h2>Explore Tests<br /> by Experts</h2>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Explore" className="tp-card-image" />
            <div className="tp-card-btns">
              <button>Explore</button>
            </div>
          </div>

          {/* Create Card */}
          <div className="tp-test-card">
            <h1>Create & Share Tests</h1>
            <img src="https://cdn-icons-png.flaticon.com/512/1256/1256650.png" alt="Create" className="tp-card-image" />
            <div className="tp-card-btns">
              <button onClick={()=>{setshowbox(true)}}>Create Test</button>
              <button onClick={()=>{navigate("/test-created")}}>View Created</button>
            </div>
          </div>
        </div>

        {/* Student Reviews */}
        <div className="tp-right-section">
          <div className="tp-review-heading">
            <span>Student Reviews</span>
            <span className="tp-add-icon">➕</span>
          </div>
          <div className="tp-review-box">
            <div className="tp-review-msg">Amazing Test Quality!</div>
            <div className="tp-review-msg">Loved the paper layout!</div>
            <div className="tp-review-msg">Helpful for last-minute prep.</div>
          </div>
        </div>
      </div>

      {/* ✅ LOWER SECTION */}
      <div className="tp-lower-section">
        <h2>Previous Year Question Papers</h2>
        <div className="tp-paper-cards">
          {[...Array(9)].map((_, i) => (
            <div className="tp-paper-card" key={i}>
              <h4>JEE Main {2023 - i}</h4>
              <div className="tp-actions">
                <button className="tp-attempt-btn">Attempt</button>
                <span className="tp-download-icon">📥</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
