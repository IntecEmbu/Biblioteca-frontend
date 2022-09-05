import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt,FaPen } from "react-icons/fa"
import '../styles/CardBook.css'
import '../styles/Botoes.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('book_selected', JSON.stringify(props))
  // }

  const [buttons, setButtons] = React.useState('')

  function showButtons(){
    if(JSON.parse(localStorage.getItem('user')).librarian_type == 'ADM' ||
       JSON.parse(localStorage.getItem('user')).librarian_type == 'Bibliotecario'){
        setButtons(
          <div className="btn-card-container">
            <Link to="/modal">
              <button className="btn-editar-card"><FaPen className="fa-pen"/>Editar</button>
            </Link>
            <Link to="/modal">
              <button className="btn-excluir-card"><FaTrashAlt className="fa-trash"/>Excluir</button>
            </Link>
          </div>
        )
    }
  }

  useEffect(() => {
    showButtons()
  }, [])

  return (
    <div id="card-book-container">
      <div className="card-book">
        <p className="titulo-card">{props.name}</p>
        <p className="p-card-book">AUTOR: {props.author}</p>
        <p className="p-card-book">EDIÇÃO: {props.edition}</p>
        <p className="p-card-book">ANO: {props.release_year}</p>
        <p className="p-card-book">CATEGORIA: {props.category}</p>
        <p className="p-card-book">IDIOMA: {props.language}</p>
        <p className="p-card-book">ISBN: {props.isbn}</p>
        <p className="p-card-book">CDD: {props.cdd}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook