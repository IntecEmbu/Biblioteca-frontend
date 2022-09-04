import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaTrashAlt } from "react-icons/fa"
import '../../styles/CardVoluntario.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('volunteer_selected', JSON.stringify(props))
  // }

  const [buttons, setButtons] = React.useState('')

  function showButtons(){
    if(JSON.parse(localStorage.getItem('user')).librarian_type == 'ADM' ||
       JSON.parse(localStorage.getItem('user')).librarian_type == 'Bibliotecario'){
        setButtons(
          <div className="btn-card-voluntario-container">
            <Link to="/modal">
              <button className="btn-editar-card-voluntario">Editar</button>
            </Link>
            <Link to="/modal">
              <button className="btn-excluir-card-voluntario"><FaTrashAlt /></button>
            </Link>
          </div>
        )
      }
  }

  useEffect(() => {
    showButtons()
  }, [])

  return (
    <div id="card-voluntario-container">
      <div className="card-voluntario">
        <p className="titulo-card">{props.name}</p>
        <p className="p-card-voluntario">EMAIL: {props.email}</p>
        <p className="p-card-voluntario">USUÁRIO: {props.user}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook