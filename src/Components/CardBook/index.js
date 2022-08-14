import React from 'react'
import './index.css'

function CardBook(props) {
  return (
    <div id="card-book">
        <p id='titulo-livro'>Titulo: {props.book_name}</p>
        <p className='p-card-book'>ISBN: {props.book_isbn}</p>
        <p className='p-card-book'>CDD: {props.book_cdd}</p>
        <p className='p-card-book'>ANO: {props.release_year}</p>
        <p className='p-card-book'>CATEGORIA: {props.category_name}</p>
        <p className='p-card-book'>LINGUA: {props.book_language}</p>
        <p className='p-card-book'>AUTOR: {props.book_author}</p>
    </div>
  )
}

export default CardBook