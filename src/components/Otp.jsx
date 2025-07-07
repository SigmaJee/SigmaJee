import React, { useRef, useState } from "react";
import "../styles.css";
import Toast from "../Toast/Toast";
import axios from "axios";
import validator from "validator"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../LoginContext/loginContext";
const OtpVerification = ({ funcs, elements }) => {
    const navigate = useNavigate();
    const { setisLogin, setshowEmail, showEmail, showOtp, setshowOtp } = funcs;
    const { toast, type, onClose, setToast, setType, setloading } = elements;
    const email = useRef("");
    const [emailErr, setEmailerr] = useState("");
    const actOtp = useRef("");
    const [disable, setdisable] = useState(false);
    const [time, setTime] = useState(30);
    const [enable, setEnable] = useState(false);
    const { setUser } = useAuth();
    const api = import.meta.env.VITE_API
    const Back = () => {
        setisLogin(true);
        setshowEmail(true);
        setshowOtp(false);
        return;
    }
    const otpRef = useRef([]);
    const ValidateEmail = async () => {
        if (email.current === "") {
            setEmailerr("Email cannot be empty");
            setTimeout(() => {
                setEmailerr("");
            }, 1000);
            return;
        }
        if (!validator.isEmail(email.current)) {
            setEmailerr("Enter a valid Email");
            setTimeout(() => {
                setEmailerr("");
            }, 1000);
            return;
        };
        await axios.post(`api/user/find-user`, { Email: email.current }).then(async (res) => {
            setshowOtp(true);
            setdisable(true);
            await sendOtp();
        }).catch(err => {
            setEmailerr(err.response.data.message);
            setTimeout(() => {
                setEmailerr("");
            }, 1000);
            console.log(err);
        })
    }
    const submit = async () => {
        const finOtp = otpRef.current.map((input) => input.value).join("");
        if (finOtp === actOtp.current) {
            setloading(true);
            setUser(true);
            setTimeout(() => {
                setloading(false);
                navigate("/home", { replace: true });
            }, 1000);

            localStorage.setItem("email", email.current);
            await axios.post(`/api/user/give-user`, { Email: email.current }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("API Response:", res.data);
                    console.log("API user:", res.data.userId);
                    localStorage.setItem("userId",res.data.userId);
                })
                .catch(err => {
                    console.log(err);
                    console.log("Err in getting user");
                });


        }
        else {
            setToast("Incorrect OTP");
            setType("error");
            setTimeout(() => {
                setToast("");
            }, 1000);
        }
    }
    const handleChange = (e, index) => {
        const val = e.target.value;
        if (val.length > 1) return;
        if (val !== "" && index < 5) {
            otpRef.current[index + 1].focus();
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
        if (key === "Backspace" && otpRef.current[index].value === "" && index > 0) {
            otpRef.current[index - 1].focus();
        }
    }
    const sendOtp = async () => {
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
        await axios.post(`api/user/send-otp`, { Email: email.current }).then((res) => {
            console.log("Otp sent");
            actOtp.current = String(res.data.otp);
        }).catch(err => {
            console.log(err);
        })


    }

    return (
        <>
            <div className="side-bar" >

                <form className="login-box" data-aos="fade-down" onSubmit={(e) => {
                    e.preventDefault();
                    if (!showOtp) {
                        ValidateEmail();
                    }
                    else {
                        submit();
                    }
                }}>
                    <h2 className="login-heading">Verify OTP</h2>

                    <input
                        type="text"
                        className="login-input"
                        placeholder="Enter your email"
                        disabled={disable}
                        onChange={(e) => email.current = e.target.value}
                        style={{ border: `1px solid ${emailErr ? "red" : "black"}` }}
                    />
                    {emailErr !== "" && <span data-aos="fade-right" style={{ textAlign: 'center', color: "red" }}>{emailErr}</span>}
                    {showOtp && <div className="otp-boxes" data-aos="fade-down">
                        {[...Array(6)].map((_, i) => (
                            <input key={i} type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                ref={(el) => otpRef.current[i] = el}
                                className="otp-input" onChange={(e) => handleChange(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} />
                        ))}
                    </div>}
                    {enable ?
                        showOtp && <p className="login-link" onClick={sendOtp} style={{ textAlign: "center" }}>Resend Otp</p> :
                        showOtp && <p style={{ textAlign: "center" }}>{`Resend otp in ${time}`}</p>
                    }
                    <button type="submit" className="login-button" >{(showEmail && !showOtp) ? "Verify" : "Submit"}</button>
                    <div className="login-links" style={{ marginTop: "10px" }}>
                        <div href="#" className="login-link" onClick={Back}>Back</div>
                        {showOtp && <div href="#" className="login-link" onClick={() => { setdisable(false), setshowOtp(false) }}>Change Email</div>}
                    </div>
                </form>
            </div>
        </>

    );
};

export default OtpVerification;
