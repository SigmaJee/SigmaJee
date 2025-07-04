import React from "react";
import "../styles.css"
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";
import validator from "validator"
import { useNavigate } from "react-router-dom";
import { useAuth } from '../LoginContext/loginContext';
import { SignupAuth } from "./CanGoSignup/canSignupContext";
const Hero = ({ elements, funcs }) => {
  const api = import.meta.env.VITE_API;
  const navigate = useNavigate();
  const { Box, ShowBox, disable, setDisable } = funcs
  const [emailErr, setEmailerr] = useState("");
  const { toast, type, onClose, setToast, setType, setloading } = elements;
  const [time, setTime] = useState(30);
  const [enable, setEnable] = useState(false);
  const { setUser } = useAuth();
  const actOtp = useRef("");
  const email = useRef("");
  const Otp = useRef([]);
  const {canSignup,setCanSignup}=SignupAuth();
  const handlechange = (e, index) => {
    if (Otp.current[index] !== "" && index < 5) {
      Otp.current[index + 1].focus();
    }
  }
  const onSubmit = () => {
    const finOtp = Otp.current.map((input) => input.value).join("");
    if (finOtp === actOtp.current) {
      setloading(true);
      sessionStorage.setItem("isvalid",true);
      setCanSignup(true);
      sessionStorage.setItem("email",email.current);
        setTimeout(() => {
          setloading(false);
          navigate("/signup-form", { replace: true });
        }, 3000);
         
    
      return;
  }

    else {
      setToast("Incorrect Otp");
      setType("error");

      setTimeout(() => {
        setToast("");
      }, 3000);
      return;
    }
  }
  const ValidateEmail = async (email) => {
    if (email === "") {
      setEmailerr("Email cannot be empty");
      setTimeout(() => {
        setEmailerr("");
      }, 3000);
      return;
    }
    if (!validator.isEmail(email)) {
      setEmailerr("Enter a valid Email");
      setTimeout(() => {
        setEmailerr("");
      }, 3000);
      return;
    }

    await axios.post(` api/user/signup`, { Email: email }).then(async (res) => {
      ShowBox(true);
      setDisable(true);
      await Sendotp();

    }).catch((err) => {
      console.log(err);
      setEmailerr(err.response.data.message + " Go to Login");
      setTimeout(() => {
        setEmailerr("");
      }, 3000);

    })
  }
  const Sendotp = async () => {
    setEnable(false);
    setTime(30);
    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setEnable(true);
          return;
        }
        return prev - 1;
      })

    }, 1000);
    await axios.post(` api/user/send-otp`, { Email: email.current }).then((res) => {
      console.log("otp sent");
      actOtp.current = String(res.data.otp);
    }).catch(err => {
      log("Otp not sent");
    })



  }
  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "ArrowLeft" && index > 0) {
      Otp.current[index - 1].focus();
    }

    if (key === "ArrowRight" && index < 5) {
      Otp.current[index + 1].focus();
    }

    if (key === "Backspace") {
      if (Otp.current[index].value === "") {
        if (index > 0) {
          Otp.current[index - 1].focus();
          Otp.current[index - 1].value = ""; // also clear the previous one
        }
      } else {
        Otp.current[index].value = ""; // just clear current box
      }
    }
  };

  return (
    <section className="hero" data-aos="fade-up">
      <form className="hero-left" onSubmit={
        (e) => {
          e.preventDefault();
          if (!Box) {
            ValidateEmail(email.current);
          } else {
            onSubmit(email.current);
          }
        }
      } >
        <h1 className="hero-heading">Crack your goal with<br />India's top educators</h1>
        <p className="hero-subtext">
          Over <span className="highlight">10 crore</span> learners trust us for their preparation
        </p>
        {Box && <p style={{ textAlign: "center", marginBottom: "10px", width: "87%", textDecoration: "bold" }}>Enter the otp sent on your Email</p>}
        <div className="phone-input" style={{ border: `1px solid ${emailErr ? "red" : "black"}` }}>
          <span className="country-code">Email</span>
          <input type="text" placeholder="abc@example.com"
            disabled={disable}
            onChange={(e) => {
              email.current = e.target.value;
            }}

          />
        </div>
        {emailErr && <p data-aos="fade-right" style={{ textAlign: 'start', color: "red", marginBottom: "17px" }}>{emailErr}</p>}
        {Box && <div className=" interface-otp abc" data-aos="fade-down">
          {[...Array(6)].map((_, i) => (
            <input key={i} type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              ref={(el) => Otp.current[i] = el}
              className="otp-input" onChange={(e) => handlechange(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} />
          ))}
          <div className="login-link abcd" style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => { setDisable(false); ShowBox(false); setEnable(false) }}>Change Email</div>
        </div>}
        {enable ?
          Box && <p className="login-link" onClick={Sendotp} style={{ textAlign: "center", marginBottom: "10px", width: "86%" }}>Resend Otp</p> :
          Box && <p style={{ textAlign: "center", marginBottom: "10px", width: "86%" }}>{`Resend otp in ${time}`}</p>
        }
        {(!emailErr && !Box) && <p className="otp-note" style={{ textAlign: 'center', width: "87%" }}>We'll send an OTP for verification</p>}
        <button className="cta-btn">{(Box) ? `Submit Otp` : `Join for free`}</button>
      </form>
      <div className="hero-right">
        <div className="circle-images">
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140037.png" alt="Student 1" />
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" alt="Student 2" />
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" alt="Student 3" />
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140036.png" alt="Student 4" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
