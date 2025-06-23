import React, { useState } from "react";
import "../styles.css"
import Toast from "../Toast/Toast";
const ExamSection = ({ func,elements }) => {
  const right = [0, 1, 4, 5];
  const { setShow } = func;
  const { toast, type, onClose, setToast, setType }=elements;
  const open = () => {
    setShow(true);
    setToast("Login To Continue");
    setType("error");
    setTimeout(() => {
      setToast("");
    }, 4000);
  }
  return (
    <>
      {toast && <Toast elements={elements} />}
      <section className="exam-section">
        <h2 className="exam-heading">Select your goal / exam</h2>
        <p className="exam-subheading">
          <span className="highlight-green">200+</span> exams available for your preparation
        </p>

        <div className="exam-search">
          <input type="text" placeholder="🔍 Type the goal / exam you're preparing for" />
        </div>

        <h3 className="popular-goals-title">Popular goals</h3>

        <div className="exam-cards">
          {[
            ["UPSC CSE - GS", "https://cdn-icons-png.flaticon.com/512/3372/3372890.png"],
            ["IIT JEE", "https://cdn-icons-png.flaticon.com/512/2721/2721297.png"],
            ["NEET UG", "https://cdn-icons-png.flaticon.com/512/928/928731.png"],
            ["Bank exams", "https://cdn-icons-png.flaticon.com/512/944/944719.png"],
            ["SSC JE & state AE exams", "https://cdn-icons-png.flaticon.com/512/1681/1681157.png"],
            ["CAT & other MBA", "https://cdn-icons-png.flaticon.com/512/2747/2747848.png"],
            ["CBSE class 12", "https://cdn-icons-png.flaticon.com/512/3135/3135755.png"],
            ["CA Intermediate", "https://cdn-icons-png.flaticon.com/512/3372/3372890.png"]
          ].map(([title, img], i) => (
            <div className="exam-card" data-aos={(right.indexOf(i) !== -1) ? "fade-right" : "fade-left"} key={i} onClick={open}>
              <img src={img} alt={title} />
              <p>{title}</p>
            </div>
          ))}
        </div>
      </section>
    </>

  );
};

export default ExamSection;
