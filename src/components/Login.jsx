import React from 'react';
import "../styles.css";
import Toast from '../Toast/Toast';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import validator from "validator";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useAuth } from '../LoginContext/loginContext';
const Login = ({ funcs, elements }) => {
    const navigate = useNavigate();
    const { setisSignup, setisLogin } = funcs;
    const { handleSubmit, reset } = useForm();
    const { toast, type, onClose, setToast, setType,setloading } = elements;
    const [Emailerr, setEmailerr] = useState("");
    const [Passerr, setPasserr] = useState("");
    const [Pass, ShowPass] = useState(false);
    const [disable, setDisable] = useState(false);
    const email = useRef("");
    const [ischecked, setisChecked] = useState(false);
    const Password = useRef("");
    const { setUser } = useAuth();
    const api=import.meta.env.VITE_API;
    const signup = () => {
        setisLogin(false);
        setisSignup(true);
        return;
    }
    const otp = () => {
        setisLogin(false);
        setisSignup(false);
        ShowPass(false);
        return;
    }
    const ValidateEmail = (email) => {
        if (!validator.isEmail(email)) {
            setEmailerr("Enter a valid Email");
            setTimeout(() => {
                setEmailerr("");
            }, 2000);
            return;
        }
        axios.post(`${api}/find-user`, { Email: email }).then((res) => {
            ShowPass(true);
            setDisable(true);
            return;
        }).catch((err) => {
            setEmailerr(err.response?.data?.message || "Something went wrong");
            setTimeout(() => {
                setEmailerr("");
            }, 2000);
            return;
        })
    }
    const onsubmit = async () => {
       
        await axios.post(`${api}/login`, { email: email.current, pass: Password.current },{
            withCredentials:true
        }).then((res) => {
            setToast("Success");
            setType("success");
            setloading(true);
            setUser(true);
            setTimeout(() => {
                setloading(false);
                navigate("/home", { replace: true });
            }, 3000);
             sessionStorage.setItem("email",email.current);
            
        }).catch((err) => {
            setPasserr(err.response.data.message);
            setTimeout(() => {
                setPasserr("");
            }, 2000);
            console.log(err);
        })

    };
    const Makedefault = () => {
        ShowPass(false);
        setDisable(false);
        email.current = "";
    }

    return (
        <>
            <form
                className="login-box"
                data-aos="fade-down"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!Pass) {

                        ValidateEmail(email.current);
                    } else {
                        handleSubmit(onsubmit)(e);
                    }
                }}
            >

                <h2 className="login-heading">Login</h2>
                <input
                    type="text"
                    className="login-input"
                    placeholder="Enter your email"
                    disabled={disable}
                    style={{ border: `1px solid ${Emailerr ? "red" : "black"}` }}
                    onChange={(e) => { email.current = e.target.value.trim("") }}
                />

                {Emailerr && <span data-aos="fade-right" style={{ textAlign: 'center', color: "red" }}>{Emailerr}</span>}
                {Pass && <input
                    data-aos="fade-down"
                    type={ischecked ? "text" : "password"}
                    className="login-input"
                    placeholder="Enter your password"
                     style={{ border: `1px solid ${Passerr ? "red" : "black"}` }}
                    onChange={(e) => { Password.current = e.target.value }}
                />}
                {Passerr && <span data-aos="fade-right" style={{ textAlign: 'center', color: "red" }}>{Passerr}</span>}
                {Pass && <label style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
                    <input
                        type="checkbox"
                        checked={ischecked}
                        onChange={(e) => setisChecked(e.target.checked)}
                    />
                    Show Password
                </label>}

                <button type="submit" className="login-button" >Login</button>
                <p className="or-line">or</p>
                <div className="login-links">
                    {!Pass ? <>
                        <span className="login-link" onClick={signup}>Signup</span>
                        <span className="link-separator">|</span>
                        <span className="login-link" onClick={otp}>Continue with OTP</span>
                    </> : <>
                        <span className="login-link" onClick={Makedefault}>Back </span>
                        <span className="link-separator">|</span>
                        <span className="login-link" onClick={() => { setDisable(false); ShowPass(false) }}>Change Email</span>

                    </>}
                </div>
            </form>
        </>

    );
};

export default Login;