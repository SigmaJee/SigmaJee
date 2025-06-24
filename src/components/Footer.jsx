import React from "react";
import "../styles.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="footer-logo">
            <span style={{ color: "#00b3a4" }}>🟢</span>
            <span style={{ color: "#0b6fff" }}>Sigma JEE</span>
          </h2>
          <p className="footer-description">
            Sigma JEE is democratising education,<br />
            making it accessible to all. Join the revolution,<br />
            learn on India’s largest learning platform.
          </p>
          <div className="footer-contact">
            <p><strong>Reach out to us</strong></p>
            <p>Get your questions answered about learning<br /> with Sigma JEE.</p>
            <p>📞 Call <strong>+91 8370944506</strong></p>
          </div>
        </div>

        <div className="footer-links">
          {[
            ["Company", ["About Us", "Shikshodaya", "Careers", "Blogs", "Privacy policy", "Terms and conditions"]],
            ["Help & support", ["User Guidelines", "Site Map", "Refund Policy", "Takedown Policy", "Grievance Redressal"]],
            ["Company", ["📱 Learner app", "👨‍🏫 Educator app", "👪 Parent app"]],
            ["Popular goals", ["IIT JEE", "UPSC", "SSC", "CSIR UGC NET", "NEET UG"]],
            ["Sigma JEE Centre", ["IIT JEE", "NEET UG", "Kota Foundation", "Delhi UPSC"]],
            ["Study material", ["UPSC Study Material", "NEET UG Study Material", "CA Foundation Study Material", "JEE Study Material", "SSC Study Material"]],
          ].map(([heading, items], idx) => (
            <div className="footer-column" key={idx}>
              <h4>{heading}</h4>
              {items.map((item, i) => (
                <p key={i}>{item}</p>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Sorting Hat Technologies Pvt Ltd</p>
        <div className="footer-socials">
          <span>📘</span>
          <span>▶️</span>
          <span>🐦</span>
          <span>📷</span>
          <span>💼</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
