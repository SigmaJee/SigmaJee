import React, { useState } from "react";
import "../styles.css";
import { useRef } from "react";
import Toast from "../Toast/Toast.jsx";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import validator from "validator"
import { useNavigate } from "react-router-dom";
import { SignupAuth } from "./CanGoSignup/canSignupContext.jsx";
const Signup = ({ funcs, elements }) => {
    const navigate = useNavigate();
    const { setisSignup, setisLogin, setshowEmail, setshowOtp, showOtp, showEmail } = funcs;
    const { toast, type, onClose, setToast, setType, setloading } = elements;
    const [otp, setOtp] = useState(["", "", "", "", "", "", ""])
    const [email, setEmail] = useState("");
    const { handleSubmit } = useForm();
    const [emailErr, setEmailerr] = useState("");
    const [enable, setEnable] = useState(false);
    const [time, setTime] = useState(30);
    const actOtpRef = useRef("");
    const {canSignup,setCanSignup}=SignupAuth();
    const api = import.meta.env.VITE_API;
    const login = () => {
        setisLogin(true);
        setisSignup(false);
        setshowOtp(false);
        return;
    }
    const [disable, setDisable] = useState(false);
    const verifyEmail = async (email) => {
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
        await axios.post(`${api}/signup`, { Email: email }).then(async (res) => {
            setshowOtp(true);
            setDisable(true);
            await SendOtp();

        }).catch((err) => {
            setEmailerr(err.response.data.message)
            setTimeout(() => {
                setEmailerr("");
            }, 3000);
        })
    }
    const otpRef = useRef([]);
    const handlechange = (e, index) => {
        const val = e.target.value;
        if (val.length > 1) return;
        if (otpRef.current[index].value !== "" && index < 5) {
            otpRef.current[index + 1].focus();
        }
    }
    const SubmitOtp = async () => {
        const finOtp = otpRef.current.map((input) => input.value).join("");
        if (finOtp === actOtpRef.current) {
            setloading(true);
            localStorage.setItem("isvalid",true);
            localStorage.setItem("email",email);
            setCanSignup(true);
            setTimeout(() => {
                setloading(false);
                navigate("/signup-form", { replace: true });
            }, 3000);
             
        }
        else {
            setToast("Incorrect Otp");
            setType("error");
            setTimeout(() => {
                setToast("");
            }, 3000);
        }

    }
    const handleKeyDown = (e, index) => {
        const key = e.key;
        if (key == "ArrowLeft" && index > 0) {
            otpRef.current[index - 1].focus();
        }
        if (key == "ArrowRight" && index < 5) {
            otpRef.current[index + 1].focus();
        }
        if (key == "Backspace" && otpRef.current[index].value === "" && index > 0) {
            otpRef.current[index - 1].focus();
        }
    }
    const SendOtp = async () => {
        setTime(30);
        setEnable(false);
        const timer = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setEnable(true);
                    return;
                }
                return prev - 1;
            });
        }, 1000);
        await axios.post(`${api}/send-otp`, { Email: email }).then((res) => {
            console.log("Otp Sent ");
            actOtpRef.current = String(res.data.otp);

        }).catch(err => {
            console.log(err.response.data.message);
            console.log(err);
        })



    }
    return (
        <>
            <div className="side-bar" >
                <form className="login-box"
                    data-aos="fade-down"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!showOtp) {
                            const Email = email.trim();
                            verifyEmail(Email);
                        }
                        else {
                            SubmitOtp();
                        }
                    }}
                >
                    <h2 className="login-heading">Signup</h2>
                    <input
                        type="text"
                        className="login-input"
                        placeholder="Enter your email"
                        disabled={disable}
                        onChange={(e) => { setEmail(e.target.value) }}
                        style={{ border: `1px solid ${emailErr ? "red" : "black"}` }}
                    />
                    {emailErr && <span data-aos="fade-right" style={{ textAlign: 'center', color: "red" }}>{emailErr}</span>}
                    {showOtp && <div className="otp-boxes" data-aos="fade-down">
                        {[...Array(6)].map((_, i) => (
                            <input key={i} type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                ref={(el) => otpRef.current[i] = el}

                                className="otp-input" onChange={(e) => handlechange(e, i)} onKeyDown={(e) =>
                                    handleKeyDown(e, i)} />
                        ))}
                    </div>}
                    {!enable
                        ? (showOtp && <p style={{ textAlign: "center" }}>{`Resend otp in ${time}`}</p>)
                        : (showOtp && <p className="login-link" style={{ textAlign: "center" }} onClick={SendOtp}>Resend Otp</p>)
                    }

                    <button className="login-button" type="submit">{!showOtp ? "Verify Email" : "Submit Otp"}</button>
                    <p className="or-line">Already have an account?</p>
                    <div className="login-links">
                        <div href="#" className="login-link" onClick={login}>Login</div>
                        {disable && <div className="login-link" onClick={() => { setDisable(false); setshowOtp(false) }}>Change Email</div>}
                    </div>
                </form>
            </div>
        </>
    );
};
export default Signup;
