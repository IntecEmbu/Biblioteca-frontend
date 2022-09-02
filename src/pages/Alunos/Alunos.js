import React from 'react'
import CardAluno from '../../components/CardAluno/CardAluno.js'
import Navbar from '../../components/Navbar/Navbar.js'
import ModalCadastrarAluno from '../../components/ModalCadastrarAluno/ModalCadastrarAluno.js'
import '../../styles/Alunos.css'

export default function Alunos() {
  return (
    <>
      <Navbar />
      <div>
        <h1 className="titulo-pagina">Alunos</h1>
        <div className="pesquisa-container">
          <input className="input-pesquisa" type="text" placeholder="Nome ou curso" />
          <select className="tipo-pesquisa">
              <option>NOME</option>
              <option>CURSO</option>
          </select>
          <div className="btn-alunos-container">
          <div className="btn-pesquisar-aluno-container">
            <button className="btn-pesquisar-livro">Pesquisar</button>
          </div>
          <div className="btn-cadastrar-aluno-container">
            <ModalCadastrarAluno />
          </div>
          </div>
          
        </div>
        <div id="area-card-books">
          {/* {booksCard} */}
        </div>
      </div >
      <CardAluno />
    </>
  )
}