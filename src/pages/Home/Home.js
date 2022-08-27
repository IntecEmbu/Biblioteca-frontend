import React from 'react'
import Navbar from '../../components/Navbar/Navbar.js'
import '../../styles/Home.css'

function index() {
  return (
    <div>
      <Navbar />
      <div className="home-container">
        <img id="gif-home" src={require('../../components/Imagens/Bibliophile.png')} alt="Knowledge" />
      </div>
    </div>
  )
}

export default index