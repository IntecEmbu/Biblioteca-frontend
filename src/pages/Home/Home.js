import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js'
import '../../styles/Home.css'

function index() {

  // Coleta o nome do usuário logado
  const name = JSON.parse(localStorage.getItem('user')).librarian_name
  .toUpperCase()

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-text">
          <span className="home-title">
            Seja bem-vindo {name}
          </span>
        </div>
        <img id="gif-home" src={require('../../components/Imagens/Bibliophile.png')} alt="Knowledge" />
      </div>
    </div>
  )
}

export default index