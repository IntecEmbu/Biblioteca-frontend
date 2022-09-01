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
        <p className="p-card-aluno">NOME: {props.book_author}</p>
        <p className="p-card-aluno">CURSO: {props.book_language}</p>
        <p className="p-card-aluno">EMAIL: {props.book_edition}</p>
        <p className="p-card-aluno">CELULAR: {props.category_name}</p>
        <p className="p-card-aluno">TIPO: {props.release_year}</p>
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