// App.js
import React, { useEffect, useState } from "react";
import Fullpage from "./components/FullPage.jsx";
import { useLocation } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from "aos";
import Toast from "./Toast/Toast.jsx";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Home/HomePage.jsx";
import Loading from "./Loading/loading.jsx";
import SignupPage from "./SignupForm/SignupForm.jsx";
import { useAuth } from "./LoginContext/loginContext.jsx";
import { SignupAuth } from "./components/CanGoSignup/canSignupContext.jsx";
import CreateTest from "./Test/CreateTest/CreateTest.jsx";
import TestPage from "./Test/TestPage/TestPage.jsx";
import TestScreen from "./Test/Screen/TestScreen.jsx";
import CreatedTests from "./Test/CreatedTest/CreatedTests.jsx";
function App() {
   const location = useLocation(); 
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  useEffect(() => {
    // Wait 200ms after route change to ensure DOM updates
    setTimeout(() => {
      AOS.refreshHard();  // More aggressive than AOS.refresh()
    }, 10);
  }, [location]);
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
         <Route path='/test-screen' element={user?<TestScreen elements={elements}  />:<Fullpage elements={elements} func={func} funcs={funcs}/>} />
          <Route path='/test-page' element={user?<TestPage elements={elements} />:<Fullpage elements={elements} func={func} funcs={funcs}/>} />
          <Route path='/test-create' element={user?<CreateTest elements={elements} />:<Fullpage elements={elements} func={func} funcs={funcs}/>} />
          <Route path='/test-created' element={user?<CreatedTests elements={elements}  />:<Fullpage elements={elements} func={func} funcs={funcs}/>} />
        <Route path="/signup-form" element={
          canSignup ? <SignupPage elements={elements} /> :
            <>
              <Fullpage elements={elements} func={func} funcs={funcs}/>
            </>
        } />
        <Route path="/" element={
          user?<HomePage elements={elements} />:
          <Fullpage elements={elements} func={func} funcs={funcs}/>} />
        <Route path="/home" element={user ? <HomePage elements={elements}  /> : <Fullpage elements={elements} func={func} funcs={funcs}/>} />
      </Routes>
    </>
  );
}

export default App;
