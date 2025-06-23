import React from "react";
import "../styles.css"
const Features = () => {
  return (
    <section className="features-section">
      <div className="feature-card" data-aos="fade-up">
        <img src="https://cdn-icons-png.flaticon.com/512/6815/6815044.png" alt="Live class" />
        <h3>Daily live classes</h3>
        <p>
          Chat with educators, ask questions, answer live polls, and get your doubts cleared – all while the class is going on
        </p>
      </div>
      <div className="feature-card" data-aos="fade-up">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Practice" />
        <h3>Practice and revise</h3>
        <p>
          Learning isn’t just limited to classes with our practice section, mock tests and lecture notes shared as PDFs for your revision
        </p>
      </div>
      <div className="feature-card" data-aos="fade-up">
        <img src="https://cdn-icons-png.flaticon.com/512/1475/1475996.png" alt="Learn anywhere" />
        <h3>Learn anytime, anywhere</h3>
        <p>
          One subscription gets you access to all our live and recorded classes to watch from the comfort of any of your devices
        </p>
      </div>
    </section>
  );
};

export default Features;
