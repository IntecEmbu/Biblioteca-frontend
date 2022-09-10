import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/CardHome.css'

function CardHome(props) {
  return (
    <div className="card-home-container">
      <div className="cards">
        <div className="card">
          <div className="icon">
            <img src={require('../images/card-pesquisar-livro.png')} alt="Pesquisar Livro" />
          </div>
          <h1>Livros</h1>
          <Link to="/livros" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
        <div className="card">
          <div className="icon">
            <img src={require('../images/card-cadastrar-livro.png')} alt="Cadastrar Livro" />
          </div>
          <h1>Cadastar Livro</h1>
          <Link to="/cadastrar-livro" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
        <div className="card">
          <div className="icon">
            <img src={require('../images/card-alunos.png')} alt="Alunos" />
          </div>
          <h1>Alunos</h1>
          <Link to="/alunos" className="link-card-home">
            <button className="btn-card-home">Visitar</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardHome