import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar.js'
<<<<<<< HEAD
import CardHome from '../../components/CardHome/CardHome.js' 
=======
>>>>>>> 3f516ee6b7b749279c999f9476d12c010121d949
import '../../styles/Home.css'

function index() {

  // Coleta o nome do usuário logado
  const name = JSON.parse(localStorage.getItem('user')).librarian_name
<<<<<<< HEAD
=======
  .toUpperCase()
>>>>>>> 3f516ee6b7b749279c999f9476d12c010121d949

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <div className="home-text">
          <span className="home-title">
<<<<<<< HEAD
            Olá, {name}!
          </span>
        </div>
      </div>
      <CardHome />
=======
            Seja bem-vindo {name}
          </span>
        </div>
        <img id="gif-home" src={require('../../components/Imagens/Bibliophile.png')} alt="Knowledge" />
      </div>
>>>>>>> 3f516ee6b7b749279c999f9476d12c010121d949
    </div>
  )
}

export default index