import React from "react";
import "../styles.css"
const StartLearning = ({ func,funcs }) => {

  const { setShow } = func;
  const {ShowBox,setDisable}=funcs;
  return (
    <section className="start-learning-section">
      <div className="learning-left" data-aos="fade-right">
        <h2 className="learning-heading">
          Start learning with <br/>
          <span>Sigma JEE</span>
        </h2>
        <p className="learning-subtext">
          Get unlimited access to structured <br />
          courses & doubt clearing sessions
        </p>
        <button className="start-btn" onClick={() => { setShow(true) ;setDisable(false);ShowBox(false) }}>Start learning</button>
      </div>

      <div className="learning-right" data-aos="fade-left">
        {[
          ["Exam categories", "60+", "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"],
          ["Educators", "14k+", "https://cdn-icons-png.flaticon.com/512/1946/1946429.png"],
          ["Daily live classes", "1.5k+", "https://cdn-icons-png.flaticon.com/512/2907/2907353.png"],
          ["Video lessons", "1M+", "https://cdn-icons-png.flaticon.com/512/4208/4208496.png"],
          ["Mins. watched", "3.2B+", "https://cdn-icons-png.flaticon.com/512/3595/3595455.png"]
        ].map(([title, value, img], i) => (
          <div className={`info-card `} key={i}>
            <div className="info-text">
              <p className="info-title">{title}</p>
              <h3>{value}</h3>
            </div>
            <img src={img} className={`${i === 1 ? "ab" : "none"}`} alt={title} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default StartLearning;
