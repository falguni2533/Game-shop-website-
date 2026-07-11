import React from 'react'
import './myLibrary.css'

function MyLibrary({  games, reference }) {
  return (
    <section id="my-library" className="my-library" ref={reference}>
      <h1>My Library</h1>
    </section>
  )
}

export default MyLibrary
