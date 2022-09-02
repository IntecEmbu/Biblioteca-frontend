import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/CardAluno.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('book_selected', JSON.stringify(props))
  // }
  
  return (
    <div id="card-aluno-container">
      <div className="card-aluno">
        <p className="titulo-card">{props.book_name}</p>
        <p className="p-card-aluno">EMAIL: {props.book_edition}</p>
        <p className="p-card-aluno">USUÁRIO: {props.category_name}</p>
        <div className="btn-card-aluno-container">
          <Link to="/modal">
          <button className="btn-card-aluno">+</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardBook