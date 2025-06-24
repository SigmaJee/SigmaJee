import React from "react";
import "../styles.css"
const Navbar = ({ func ,funcs}) => {
  const { setShow } = func;
  const {ShowBox,setDisable}=funcs;
  const Open = () => {
    setShow(true);
    ShowBox(false);
    setDisable(false);
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
