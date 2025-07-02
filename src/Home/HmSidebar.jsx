import React from 'react';
import './Sidebar.css';
import { Home, BookOpen, Users, Settings, HelpCircle, LogOut, X } from 'lucide-react';
import AOS from "aos"
const RightSidebar = ({el}) => {
    const {setshow}=el;
  return (
    <>
      {/* Overlay */}
      <div className="sidebar-overlay" onClick={()=>{setshow(false)}}></div>

      {/* Sidebar */}
      <div className="right-sidebar" data-aos="fade-left">
        <div className="sidebar-content">

          {/* Close Button */}
          <div className="sidebar-close"onClick={()=>{setshow(false)}}>
            <X size={24} />
          </div>

          {/* Profile Section */}
          <div className="sidebar-top">
            <div className="profile-pic">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
            </div>
            <div className="profile-info">
              <p className="email">raghavvora375@gmail.com</p>
              <p className="class">Class: 11</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="sidebar-links">
            <a href="#"><Home size={18} /> Dashboard</a>
            <a href="#"><BookOpen size={18} /> Study Material</a>
            <a href="#"><Users size={18} /> Peer Group</a>
            <a href="#"><Settings size={18} /> Preferences</a>
            <a href="#"><HelpCircle size={18} /> Support</a>
          </div>

          {/* Logout */}
          <div className="logout-section">
            <button><LogOut size={18} /> Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
