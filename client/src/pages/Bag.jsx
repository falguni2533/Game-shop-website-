import React from 'react'
import './bag.css'

function Bag({ games, reference, active }) {
  return  (
  <section id="bag" className={`bag ${active ? "active" : ""}`} ref={reference}>
    <h1>My Bag</h1>
  </section>
  )
    
}

export default Bag
