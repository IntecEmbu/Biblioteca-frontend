import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ModalExcluir from '../components/ModalExcluir.js'
import ModalEditarLivro from '../components/ModalEditarLivro.js'
import '../styles/Cards.css'
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
              <button className="btn-emprestar-card">Emprestar</button>
            </Link>
            <div className="btn-editar-container">
              <ModalEditarLivro />
            </div>
            <div className="btn-excluir-container">
              <ModalExcluir />
            </div>
          </div>
        )
    }
  }

  useEffect(() => {
    showButtons()
  }, [])

  return (
    <div id="card-main-container">
      <div className="card-main">
        <p className="titulo-card-main">{props.name}</p>
        <p className="p-card-main">AUTOR: {props.author}</p>
        <p className="p-card-main">EDIÇÃO: {props.edition}</p>
        <p className="p-card-main">ANO: {props.release_year}</p>
        <p className="p-card-main">CATEGORIA: {props.category}</p>
        <p className="p-card-main">IDIOMA: {props.language}</p>
        <p className="p-card-main">ISBN: {props.isbn}</p>
        <p className="p-card-main">CDD: {props.cdd}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook