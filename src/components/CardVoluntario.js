import React, { useEffect } from 'react'
import ModalExcluir from '../components/ModalExcluir.js'
import ModalEditarVoluntario from '../components/ModalEditarVoluntario.js'
import '../styles/Cards.css'
import '../styles/Botoes.css'

function CardBook(props) {

  // function setItems(){
  //   localStorage.setItem('volunteer_selected', JSON.stringify(props))
  // }

  const [buttons, setButtons] = React.useState('')

  function showButtons() {
    if (JSON.parse(localStorage.getItem('user')).librarian_type == 'ADM' ||
      JSON.parse(localStorage.getItem('user')).librarian_type == 'Bibliotecario') {
      setButtons(
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalEditarVoluntario />
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
        <p className="p-card-main">EMAIL: {props.email}</p>
        <p className="p-card-main">USUÁRIO: {props.user}</p>
        {buttons}
      </div>
    </div>
  )
}

export default CardBook