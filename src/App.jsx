// App.js
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ExamSection from "./components/ExamSection.jsx";
import Features from "./components/Features.jsx";
import StartLearning from "./components/StartLearning.jsx";
import Footer from "./components/Footer.jsx";
import 'aos/dist/aos.css';
import AOS from "aos";
import "./styles.css"
import Sidebar from "./components/Sidebar.jsx";
import Toast from "./Toast/Toast.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";
function App() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  const [toast, setToast] = useState("");
  const [type, setType] = useState("");
  const [Show, setShow] = useState(false);
  const func = { setShow };
  const onClose = () => {
    setToast("");
  }
  const elements = { toast, type, onClose, setToast, setType };
  return (
    <>
      {toast && <Toast elements={elements} />}
      <Routes>
        <Route path="/" element={<>
          {Show && <Sidebar func={func} elements={elements} />}
          <Navbar func={func} />
          <Hero elements={elements} />
          <ExamSection func={func} elements={elements} />
          <Features />
          <StartLearning func={func}/>
          <Footer />
        </>} />
        <Route path="/home" element={<HomePage/>}/>
      </Routes>


    </>
  );
}

export default App;
