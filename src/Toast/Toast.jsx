import React from "react";
import "../styles.css"; // you can define your styles here

const Toast = ({ elements }) => {
    const { toast, type, onClose } = elements;
    return (
        <div className={`custom-toast ${type}`} data-aos="fade-down" >
            <span>{toast}</span>
            <button onClick={onClose} style={{ color: "black"} }>✖</button>
        </div>
    );
};

export default Toast;
