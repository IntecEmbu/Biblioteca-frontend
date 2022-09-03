import React from 'react'
import CardVoluntario from '../../components/CardVoluntario/CardVoluntario.js'
import Navbar from '../../components/Navbar/Navbar.js'
import ModalCadastrarVoluntario from '../../components/ModalCadastrarVoluntario/ModalCadastrarVoluntario.js'
import { FaSearch } from "react-icons/fa"
import '../../styles/Voluntarios.css'

export default function Alunos() {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="titulo-pagina">Voluntários</h1>
        <div className="pesquisa-container">
          <input className="input-pesquisa" type="text" placeholder="Nome" />
          <div className="btn-alunos-container">
          <div className="btn-pesquisar-aluno-container">
            <button className="btn-pesquisar-livro"><FaSearch /></button>
          </div>
          <div className="btn-cadastrar-aluno-container">
            <ModalCadastrarVoluntario />
          </div>
          </div>
          
        </div>
        <div id="area-card-books">
          {/* {booksCard} */}
        </div>
      </div >
      <CardVoluntario />
    </>
  )
}
