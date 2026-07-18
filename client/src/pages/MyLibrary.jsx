import React from 'react'
import './myLibrary.css'

function MyLibrary({  games, reference, active }) {
  return (
    <section id="my-library" className={`my-library ${active ? "active" : ""}`} ref={reference}>
      <h1>My Library</h1>
    </section>
  )
}

export default MyLibrary
