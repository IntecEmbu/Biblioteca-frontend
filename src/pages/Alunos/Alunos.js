import React, { useEffect } from 'react'
import CardAluno from '../../components/CardAluno/CardAluno.js'
import Navbar from '../../components/Navbar/Navbar.js'
import ModalCadastrarAluno from '../../components/ModalCadastrarAluno/ModalCadastrarAluno.js'
import { FaSearch } from "react-icons/fa"
import '../../styles/Alunos.css'
import Spinner from 'react-bootstrap/Spinner'
import downloadUser from '../../service/searchUser.js'

export default function Alunos() {

  const spinnner =
        <div className='area-loading'>
            <Spinner id="loading" animation='border' />
        </div>


  const [userCard, setUserCard] = React.useState(spinnner)

  async function loadUser(){
    const data = await downloadUser()
    
    console.log(data)

    if(data.length == 0){
      setUserCard(
          <img id="book-notFound" 
              src={require('../../images/livro-nao-encontrado.png')} 
              alt='Not Found' />
      )
    }

    const cards = data.map((user) => {
      return (
          <CardAluno
              id={user.user_code}
              name={user.user_name}
              email={user.user_email}
              phone={user.user_phone}
              course={user.user_course}
              type={user.user_type}
          />
      )
    })

    setUserCard(cards)
  }

  useEffect(() =>{
    loadUser()
  }, [])

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
            <button className="btn-pesquisar-livro"><FaSearch /></button>
          </div>
          <div className="btn-cadastrar-aluno-container">
            <ModalCadastrarAluno />
          </div>
          </div>
          
        </div>
        <div id="area-card-books">
          {userCard}
        </div>
      </div >
    </>
  )
}
