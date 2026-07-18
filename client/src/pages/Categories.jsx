import React from 'react'
import './categories.css'

function Categories({ games, reference, active }) {
  return  <section id="categories" className={`categories ${active ? "active" : ""}`} ref={reference}>
    <h1>Categories</h1>
  </section>;
    
  
}

export default Categories
