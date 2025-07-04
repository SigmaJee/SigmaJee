import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from './HmSidebar';
const HomePage = ({elements}) => {
  const navigate = useNavigate();
  const [show, setshow] = useState(false)
  const {setloading}=elements;
  return (
    <div className="hm-pg">
      {show && <Sidebar el={{setshow}} />}
      {/* NAVBAR */}
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

      {/* HERO SECTION */}
      <section className="hm-hero">
        <div className="hm-hero-right">
          <div className="hm-circle-images">
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" alt="Student 1" />
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" alt="Student 2" />
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Student 3" />
            <img src="https://cdn-icons-png.flaticon.com/512/4140/4140036.png" alt="Student 4" />
          </div>
        </div>
        <div className="hm-hero-left">
          <h1 className="hm-hero-heading">SigmaJEE AI Doubt Solver</h1>
          <p className="hm-hero-subtext">
            SigmaJEE uses cutting-edge AI to instantly solve your toughest questions,
            provide step-by-step solutions, and help you master IIT-JEE concepts faster than ever.
          </p>
          <button className="hm-cta-btn">Get Started</button>
        </div>
      </section>

      {/* EXPLORE + REVIEWS */}
      <section className="hm-explore-section">
        <div className="hm-explore-left" >
          <h2 className="hm-section-heading">Explore Subjects</h2>
          <div className="hm-subject-card" data-aos="fade-right">
            <h3>Physics</h3>
            <p>Understand motion, thermodynamics, and modern physics in depth.</p>
          </div>
          <div className="hm-subject-card" data-aos="fade-right">
            <h3>Chemistry</h3>
            <p>Learn reactions, equations and atomic structures thoroughly.</p>
          </div>
          <div className="hm-subject-card" data-aos="fade-right">
            <h3>Mathematics</h3>
            <p>Practice algebra, calculus and geometry with expert material.</p>
          </div>
        </div>
        <div className="hm-explore-right">
          <h2 className="hm-section-heading">Student Reviews</h2>
          <div className="hm-review-box" data-aos="fade-left">
            <div className="hm-review-message hm-received">
              "SigmaJEE helped me boost my mock test scores by 40%!"
            </div>
            <div className="hm-review-message hm-sent">
              "The AI solver explains every step—truly a game changer."
            </div>
            <div className="hm-review-message hm-received">
              "Perfect for last-minute formula revision and concept clarity."
            </div>
          </div>
          <button className="hm-add-review-btn">+</button>
        </div>
      </section>

      {/* TEST-PAPER HERO */}
      <section className="hm-tp-hero">
        <div className="hm-tp-hero-left">
          <h2 className="hm-tp-hero-heading">Create and Attempt Test Papers</h2>
          <p className="hm-tp-hero-subtext">
            Get full-length practice papers, mock tests and timed challenges curated by experts.
          </p>
          <button className="hm-cta-btn" onClick={() => {
            setloading(true);
            setTimeout(() => {
              setloading(false);
              navigate("/test-page");
            }, 1500);
            
          }}>Get Started</button>
        </div>
        <div className="hm-tp-hero-right">
          <img
            src="https://imgs.search.brave.com/tdFXcqK7-CzsneTFQGPhBPfiFKvhzJVWae6p9cHNTFI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA4LzQ1Lzc4Lzcw/LzM2MF9GXzg0NTc4/NzAzOF9xZk5lbHdr/SmI3am1UWllSR2Ez/WWFnYVNuZUtOUE1U/bi5qcGc"
            alt="Rotating Subject Animation"
            className="hm-tp-image"
          />
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section className="hm-blogs-section">
        <h2 className="hm-section-heading">Our Blogs</h2>
        <div className="hm-blogs-container">
          <div className="hm-exam-cards" data-aos="fade-up">
            {[
              ["https://cdn-icons-png.flaticon.com/512/3372/3372890.png", "5 Tips to Ace JEE Mains"],
              ["https://cdn-icons-png.flaticon.com/512/2721/2721297.png", "5 Tips to Ace JEE Mains"],
              ["https://cdn-icons-png.flaticon.com/512/928/928731.png", "5 Tips to Ace JEE Mains"],
              ["https://cdn-icons-png.flaticon.com/512/944/944719.png", "5 Tips to Ace JEE Mains"],
              ["https://cdn-icons-png.flaticon.com/512/1681/1681157.png", "How to Stay Consistent"],
              ["https://cdn-icons-png.flaticon.com/512/3372/3372890.png", "Best Apps for IIT Prep"],
              ["https://cdn-icons-png.flaticon.com/512/3135/3135755.png", "Speed Math Tricks"],
              ["https://cdn-icons-png.flaticon.com/512/3372/3372890.png", "Memory Hacks for Formulas"]
            ].map(([src, text], idx) => (
              <div className="hm-exam-card" key={idx}>
                <img src={src} alt={`Blog ${idx + 1}`} />
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div className="hm-scroll-indicator"></div>
        </div>
      </section>

      {/* MENTORSHIP SECTION */}
      <section className="hm-mentorship-section">
        <h2 className="hm-section-heading">Personal Mentorship</h2>
        <div className="hm-mentorship-cards">
          {[
            ["https://randomuser.me/api/portraits/men/32.jpg", "Rahul Sharma", ["IIT Bombay Graduate", "6 Years of Mentoring", "Physics Expert"]],
            ["https://randomuser.me/api/portraits/women/44.jpg", "Anjali Mehra", ["NIT Trichy Alumna", "Chemistry Mentor", "Ex-Byju's Faculty"]],
            ["https://randomuser.me/api/portraits/men/51.jpg", "Rakesh Patel", ["IIT Delhi Alumni", "Maths Specialist", "Author of 3 Books"]]
          ].map(([src, name, points], i) => (
            <div className="hm-mentorship-card" data-aos={`${i == 0 ? "fade-right" : i == 1 ? "fade-up" : "fade-left"}`} key={i}>
              <img src={src} alt={name} />
              <h4>{name}</h4>
              <ul>
                {points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
              <a href="#">Read more...</a>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULA SECTION */}
      <section className="hm-formula-hero">
        <div className="hm-formula-hero-left">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8750/8750754.png"
            alt="Formula Sheets"
            className="hm-formula-image"
          />
        </div>
        <div className="hm-formula-hero-right">
          <h2 className="hm-formula-hero-heading">Essential Formula Sheets</h2>
          <p className="hm-formula-hero-subtext">
            Download compact PDF formula sheets for Physics, Chemistry, and Mathematics — perfect for quick revision before tests.
          </p>
          <button className="hm-cta-btn">Get Sheets</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="hm-footer">
        <div className="hm-footer-top">
          <div className="hm-footer-left">
            <div className="hm-footer-logo">Sigma<span className="hm-logo-highlight">JEE</span></div>
            <p className="hm-footer-description">
              SigmaJEE brings you AI‑powered solutions, expert content, and personalised mentorship to ace your IIT‑JEE prep.
            </p>
            <div className="hm-footer-apps">
              <img src="https://cdn-icons-png.flaticon.com/512/888/888857.png" alt="App Store" />
              <img src="https://cdn-icons-png.flaticon.com/512/888/888841.png" alt="Google Play" />
            </div>
            <div className="hm-footer-contact">
              <p>Email: support@sigmajee.com</p>
              <p>Phone: +91‑123‑456‑7890</p>
            </div>
          </div>

          <div className="hm-footer-links">
            <div className="hm-footer-column">
              <h4>Company</h4>
              <p>About Us</p>
              <p>Careers</p>
              <p>Blog</p>
            </div>
            <div className="hm-footer-column">
              <h4>Support</h4>
              <p>Help Center</p>
              <p>Terms of Service</p>
              <p>Privacy Policy</p>
            </div>
            <div className="hm-footer-column">
              <h4>Resources</h4>
              <p>Test Papers</p>
              <p>Formula Sheets</p>
              <p>Contact Us</p>
            </div>
          </div>
        </div>

        <div className="hm-footer-bottom">
          <p>© 2025 SigmaJEE. All rights reserved.</p>
          <div className="hm-footer-socials">
            <span role="img" aria-label="like">👍</span>
            <span role="img" aria-label="twitter">🐦</span>
            <span role="img" aria-label="instagram">📸</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
