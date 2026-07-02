import React from 'react';

function NavListItem({ item, onNavClick }) {
  return (
    <li>
          <a href="#" className={`${item.active ? 'active' : 'undefined'}`} 
          onClick={() => onNavClick(item._id)}>
           <i className={`bi ${item.icon}`}></i> 
           <span className="navName"> {item.name} </span>
          </a>
        </li>
  );
}

export default NavListItem;
