import React, {useEffect} from 'react'
import CardVoluntario from '../../components/CardVoluntario/CardVoluntario.js'
import Navbar from '../../components/Navbar/Navbar.js'
import ModalCadastrarVoluntario from '../../components/ModalCadastrarVoluntario/ModalCadastrarVoluntario.js'
import { FaSearch } from "react-icons/fa"
import '../../styles/Voluntarios.css'
import downloadLibrarian from '../../service/searchLibrarian.js'
import Spinner from 'react-bootstrap/Spinner'

export default function Voluntarios() {

  const spinnner = 
    <div className='area-loading'>
      <Spinner id="loading" animation='border' />
    </div>


  const [volunteers, setVolunteers] = React.useState([])
  const [search, setSearch] = React.useState('')
  const [volunteersCard, setVolunteersCard] = React.useState(spinnner)

  async function loadVolunteers() {
    const volunteers = await downloadLibrarian()
    setVolunteers(volunteers)
    
    if(volunteers.length === 0) {
      setVolunteersCard(
        <img id="book-notFound"
          src={require('../../images/livro-nao-encontrado.png')}
          alt='Not Found' />
      )
    }

    console.log(volunteers)

    const dataCard = volunteers.map(volunteer => {
      return (
        <CardVoluntario
          key={volunteer.librarian_code}
          name={volunteer.librarian_name}
          email={volunteer.librarian_email}
          user={volunteer.librarian_user}
        />
      )
    })

    setVolunteersCard(dataCard)
  }

  useEffect(() => {
    loadVolunteers()
  }, [])

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
            {volunteersCard}
          </div>
      </div >
    </>
  )
}
