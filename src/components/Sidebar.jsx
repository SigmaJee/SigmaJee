import React, { useState } from 'react';
import "../styles.css";
import Signup from './Signup';
import OtpVerification from './Otp';
import Login from './Login';
const Sidebar = ({ func ,elements}) => {
    const [isSignup, setisSignup] = useState(false);
    const [isLogin, setisLogin] = useState(true);
    const { toast, type, onClose,setToast }=elements;
    const { setShow } = func;
    const [open, setOpen] = useState(false);
    const Close = () => {
        setShow(false);
    }
    const [showEmail, setshowEmail] = useState(true);
    const [showOtp, setshowOtp] = useState(false);
    const funcs = { setisSignup, setisLogin, setshowEmail, showEmail, showOtp, setshowOtp };
    return (
        <>
            <div className="sidebar-overlay" onClick={Close}>
            </div>
            <div className="side-bar" data-aos="fade-left">
                <div className="close-btn " onClick={Close}>✖</div>
                {isLogin ? <Login funcs={funcs} elements={elements} /> : (isSignup ? <Signup funcs={funcs} elements={elements}/> : <OtpVerification funcs={funcs} elements={elements}/>)}
            </div>

        </>


    );
};

export default Sidebar;
