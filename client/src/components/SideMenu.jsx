 import React, { useState } from "react";
import "./SideMenu.css";
import navListData from "../data/navListData";
import NavListItem from "./NavListItem";
import socialData from "../data/socialData";

function SideMenu({ active, activePage, setActivePage }) {
  const [navData, setNavData] = useState(navListData);

  const handleNavOnClick = (item) => {
    const newNavData = navData.map((nav) => ({
      ...nav,
      active: nav._id === item._id,
    }));

    setNavData(newNavData);

    // Tell Main.jsx which page to display
    setActivePage(item.target.toLowerCase());
  };

  return (
    <div className={`sideMenu ${active ? "active" : ""}`}>
      <a href="#" className="logo">
        <i className="bi bi-controller"></i>
        <span className="brand">Play</span>
      </a>

      <ul className="nav">
        {navData.map((item) => (
          <NavListItem
            key={item._id}
            item={item}
            onNavClick={handleNavOnClick}
          />
        ))}
      </ul>

      <ul className="social">
        {socialData.map((item, index) => (
          <li key={index}>
            <a href={item.link} className={item.className}>
              <i className={`bi ${item.icon}`}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideMenu;