import React, {useState} from 'react';
import './SideMenu.css';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';

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
      
    </div>
  );
}

export default SideMenu;
