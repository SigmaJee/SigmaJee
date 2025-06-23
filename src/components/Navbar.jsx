import React from "react";
import "../styles.css"
const Navbar = ({ func }) => {
  const { setShow } = func;
  const Open = () => {
    setShow(true);
  }
  return (
    <header className="navbar">
      <div className="logo">
        un<span className="logo-highlight">academy</span>
      </div>
      <div className="navbar-buttons ">
        <button className="login-btn" onClick={Open}>Log in</button>
        <button className="join-btn" onClick={Open}>Join for free</button>
      </div>
    </header>
  );
};

export default Navbar;
