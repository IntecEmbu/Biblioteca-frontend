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
  const [nameSearch, setNameSearch] = React.useState('')
  const [volunteersCard, setVolunteersCard] = React.useState(spinnner)

  async function search(){
    if(nameSearch == ''){
      alert('Preencha o campo de pesquisa')
      return
    }

    setVolunteersCard(spinnner)
    console.log(volunteers)
    setTimeout(() => {
      var volunteersFind = volunteers.filter(volunteer => 
        volunteer.librarian_name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
      )

      if(volunteersFind.length === 0){
        return setVolunteersCard(
          <img id="book-notFound"
            src={require('../../images/livro-nao-encontrado.png')}
            alt='Not Found' />
        )
      }

      const dataCard = volunteersFind.map(volunteer => {
        return (
          <CardVoluntario
            id={volunteer.librarian_code}
            name={volunteer.librarian_name}
            email={volunteer.librarian_email}
            user={volunteer.librarian_user}
            type={volunteer.librarian_type}
          />
        )
      })
      setVolunteersCard(dataCard)
    }, 100)
  }

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
          <input className="input-pesquisa" type="text" placeholder="Nome" 
          onChange={e => setNameSearch(e.target.value)} />
          <div className="btn-alunos-container">
          <div className="btn-pesquisar-aluno-container">
            <button className="btn-pesquisar-livro" onClick={search}><FaSearch /></button>
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
