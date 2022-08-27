import React from 'react'
import '../../styles/CardBook.css'

function CardBook(props) {
  return (
    <div id="card-book-container">
      <div id="card-book">
        <p id='titulo-card'>{props.book_name}</p>
        <p className='p-card-book'>AUTOR: {props.book_author}</p>
        <p className='p-card-book'>EDIÇÃO: {props.book_edition}</p>
        <p className='p-card-book'>ANO: {props.release_year}</p>
        <p className='p-card-book'>CATEGORIA: {props.category_name}</p>
        <p className='p-card-book'>IDIOMA: {props.book_language}</p>
        <p className='p-card-book'>ISBN: {props.book_isbn}</p>
        <p className='p-card-book'>CDD: {props.book_cdd}</p>
      </div>
    </div>

  )
}

export default CardBook