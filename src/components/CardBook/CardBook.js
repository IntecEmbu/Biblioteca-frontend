import React from 'react'
import '../../styles/CardBook.css'
import { Link } from 'react-router-dom'

function CardBook(props) {

  function setItems(){
    localStorage.setItem('book_selected', JSON.stringify(props))
  }

  return (
    
<<<<<<< HEAD
    <Link id="card-book-container" to='/detalhes-livro' onClick={setItems}>
      <div className="card-book">
        <p className="titulo-card">{props.book_name}</p>
        <p className="p-card-book">AUTOR: {props.book_author}</p>
        <p className="p-card-book">EDIÇÃO: {props.book_edition}</p>
        <p className="p-card-book">ANO: {props.release_year}</p>
        <p className="p-card-book">CATEGORIA: {props.category_name}</p>
        <p className="p-card-book">IDIOMA: {props.book_language}</p>
        <p className="p-card-book">ISBN: {props.book_isbn}</p>
        <p className="p-card-book">CDD: {props.book_cdd}</p>
=======
    <Link id="card-book-container" to='/detalheslivro' onClick={setItems}>
      <div id="card-book">
        <p id='titulo-card'>{props.book_name}</p>
        <p className='p-card-book'>AUTOR: {props.book_author}</p>
        <p className='p-card-book'>EDIÇÃO: {props.book_edition}</p>
        <p className='p-card-book'>ANO: {props.release_year}</p>
        <p className='p-card-book'>CATEGORIA: {props.category_name}</p>
        <p className='p-card-book'>IDIOMA: {props.book_language}</p>
        <p className='p-card-book'>ISBN: {props.book_isbn}</p>
        <p className='p-card-book'>CDD: {props.book_cdd}</p>
>>>>>>> 3f516ee6b7b749279c999f9476d12c010121d949
      </div>
    </Link>

  )
}

export default CardBook