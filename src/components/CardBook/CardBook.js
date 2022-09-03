import React from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa"
import '../../styles/CardBook.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('book_selected', JSON.stringify(props))
  // }

  const [buttons, setButtons] = React.useState('')

  function showButtons(){
    if(JSON.parse(localStorage.getItem('user')).librarian_type == 'ADM' ||
       JSON.parse(localStorage.getItem('user')).librarian_type == 'Bibliotecario'){
        setButtons(
          <div className="btn-card-book-container">
            <Link to="/modal">
              <button className="btn-editar-card-book">Editar</button>
            </Link>
            <Link to="/modal">
              <button className="btn-excluir-card-book"><FaTrashAlt /></button>
            </Link>
          </div>
        )
    }
  }

  function hideButtons(){
    setButtons('')
  }

  function controlButtons(){
    if(buttons == ''){
      showButtons()
    }else{
      hideButtons()
    }
  }

  return (
    <div id="card-book-container" onClick={controlButtons}>
      <div className="card-book">
        <p className="titulo-card">{props.book_name}</p>
        <p className="p-card-book">AUTOR: {props.book_author}</p>
        <p className="p-card-book">EDIÇÃO: {props.book_edition}</p>
        <p className="p-card-book">ANO: {props.release_year}</p>
        <p className="p-card-book">CATEGORIA: {props.category_name}</p>
        <p className="p-card-book">IDIOMA: {props.book_language}</p>
        <p className="p-card-book">ISBN: {props.book_isbn}</p>
        <p className="p-card-book">CDD: {props.book_cdd}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook