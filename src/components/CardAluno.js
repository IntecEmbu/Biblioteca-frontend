import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPen } from "react-icons/fa"
import ModalExcluir from '../components/ModalExcluir.js'
import '../styles/Cards.css'
import '../styles/Botoes.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('user_selected', JSON.stringify(props))
  // }

  const [buttons, setButtons] = React.useState('')

  function showButtons() {
    if (JSON.parse(localStorage.getItem('user')).librarian_type == 'ADM' ||
      JSON.parse(localStorage.getItem('user')).librarian_type == 'Bibliotecario') {
      setButtons(
        <div className="btn-card-container">
          <Link to="/modal">
            <button className="btn-editar-card"><FaPen className="fa-pen" />Editar</button>
          </Link>
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
        <p className="p-card-main">CURSO: {props.course}</p>
        <p className="p-card-main">EMAIL: {props.email}</p>
        <p className="p-card-main">CELULAR: {props.phone}</p>
        <p className="p-card-main">TIPO: {props.type}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook