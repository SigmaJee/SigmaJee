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
import Sidebar from "./components/Sidebar.jsx";
import Toast from "./Toast/Toast.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";
import Loading from "./Loading/loading.jsx";
import SignupPage from "./SignupForm/SignupForm.jsx";
import { useAuth } from "./LoginContext/loginContext.jsx";
import { SignupAuth } from "./components/CanGoSignup/canSignupContext.jsx";
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
  const [Box, ShowBox] = useState(false);
  const [disable, setDisable] = useState(false);
  const func = { Show, setShow };
  const funcs = { Box, ShowBox, disable, setDisable };
  const [loading, setloading] = useState(false);
  const { user } = useAuth();
  const { canSignup } = SignupAuth();
  const onClose = () => {
    setToast("");
  }
  const elements = { toast, type, onClose, setToast, setType, setloading };
  return (
    <>
      {toast && <Toast elements={elements} />}
      {loading && <Loading />}
      <Routes>
        <Route path="/signup-form" element={
          canSignup ? <SignupPage elements={elements} /> :
            <>
              {Show && <Sidebar func={func} elements={elements} />}
              <Navbar func={func} funcs={funcs} />
              <Hero elements={elements} funcs={funcs} />
              <ExamSection func={func} elements={elements} funcs={funcs} />
              <Features />
              <StartLearning func={func} funcs={funcs} />
              <Footer />
            </>
        } />
        <Route path="/" element={<>
          {Show && <Sidebar func={func} elements={elements} />}
          <Navbar func={func} funcs={funcs} />
          <Hero elements={elements} funcs={funcs} />
          <ExamSection func={func} elements={elements} funcs={funcs} />
          <Features />
          <StartLearning func={func} funcs={funcs} />
          <Footer />
        </>} />
        <Route path="/home" element={user ? <HomePage /> : <>
          {Show && <Sidebar func={func} elements={elements} />}
          <Navbar func={func} funcs={funcs} />
          <Hero elements={elements} funcs={funcs} />
          <ExamSection func={func} elements={elements} funcs={funcs} />
          <Features />
          <StartLearning func={func} funcs={funcs} />
          <Footer />
        </>} />
      </Routes>



    </>
  );
}

export default App;
