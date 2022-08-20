import React from 'react'
import './index.css'
import {Link } from 'react-router-dom';

function CardBook(props) {

  function setItems(){
    localStorage.setItem('book_selected', JSON.stringify(props))
  }

  return (
    <Link id="card-book" to='/detalheslivro' onClick={setItems}>
        <p id='titulo-livro'>Titulo: {props.book_name}</p>
        <p className='p-card-book'>ISBN: {props.book_isbn}</p>
        <p className='p-card-book'>CDD: {props.book_cdd}</p>
        <p className='p-card-book'>ANO: {props.release_year}</p>
        <p className='p-card-book'>CATEGORIA: {props.category_name}</p>
        <p className='p-card-book'>IDIOMA: {props.book_language}</p>
        <p className='p-card-book'>AUTOR: {props.book_author}</p>
        <p className='p-card-book'>EDIÇÃO: {props.book_edition}</p>
    </Link>
  )
}

export default CardBook