import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/CardHome.css'

function CardHome(props) {
  return (
    <div className="card-home-container">
      <div class="cards">
        <div class="card primeiro">
          <div class="icon">
            <img src={require('../../images/logo2.png')} alt="Contact us." />
          </div>
          <h3>Pesquisar Livro</h3>
          <span>Não sei.</span>
          <Link to="/pesquisar-livro" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
        <div class="card segundo">
          <div class="icon">
            <img src={require('../../images/logo2.png')} alt="Shop here." />
          </div>
          <h3>Cadastar Livro</h3>
          <span>Não sei.</span>
          <Link to="/cadastrar-livro" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
        <div class="card terceiro">
          <div class="icon">
            <img src={require('../../images/logo2.png')} alt="About us." />
          </div>
          <h3>Alunos</h3>
          <span>Não sei.</span>
          <Link to="/alunos" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardHome