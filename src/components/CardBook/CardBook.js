import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/CardBook.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('book_selected', JSON.stringify(props))
  // }
  
  return (
    <div id="card-book-container">
      <div className="card-book">
        <p className="titulo-card">{props.book_name}</p>
        <p className="p-card-book">AUTOR: {props.book_author}</p>
        <p className="p-card-book">EDIÇÃO: {props.book_edition}</p>
        <p className="p-card-book">ANO: {props.release_year}</p>
        <p className="p-card-book">CATEGORIA: {props.category_name}</p>
        <p className="p-card-book">IDIOMA: {props.book_language}</p>
        <p className="p-card-book">ISBN: {props.book_isbn}</p>
        <p className="p-card-book">CDD: {props.book_cdd}</p>
        <div className="btn-card-book-container">
          <Link to="/modal">
          <button className="btn-card-book">+</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardBook