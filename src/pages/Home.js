import React from 'react'
import Navbar from '../components/Navbar.js'
import '../styles/Home.css'

function index() {

  // Coleta o nome do usuário logado
  const name = JSON.parse(localStorage.getItem('user')).librarian_name.split(" ")[0]

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-text">
          <span className="home-title">
            Olá, {name}!
          </span>
        </div>
      </div>
    </div>
  )
}

export default index