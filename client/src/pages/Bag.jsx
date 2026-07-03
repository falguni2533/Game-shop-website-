import React from 'react'
import './Bag.css'

function Bag({ games, reference }) {
  return  (
  <section id="bag" className="bag" ref={reference}>
    <h1>My Bag</h1>
  </section>
  )
    
}

export default Bag
