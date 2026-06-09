import React, {useState} from 'react';
import './SideMenu.css';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';
import socialData from "../data/socialData";

function SideMenu() {
  const [navData, setNavData] = useState(navListData);
  return (
    <div className="sideMenu">
      <a href="#" className="logo">
        <i className="bi bi-controller"></i> 
        <span className="brand">Play</span>
      </a>
      <ul className="nav">
        {navData.map(item => (
          <NavListItem key={item.id} item={item} />
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
