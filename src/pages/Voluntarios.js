import React, { useEffect } from 'react'
import CardVoluntario from '../components/CardVoluntario.js'
import Navbar from '../components/Navbar.js'
import ModalCadastrarVoluntario from '../components/ModalCadastrarVoluntario.js'
import { FaSearch } from "react-icons/fa"
import downloadLibrarian from '../service/searchLibrarian.js'
import Spinner from 'react-bootstrap/Spinner'
import '../styles/Botoes.css'

export default function Voluntarios() {

  const spinnner =
    <div className='area-loading'>
      <Spinner id="loading" animation='border' />
    </div>

  const [isDisabled, setIsDisabled] = React.useState(true)
  const [volunteers, setVolunteers] = React.useState([])
  const [nameSearch, setNameSearch] = React.useState('')
  const [volunteersCard, setVolunteersCard] = React.useState(spinnner)

  async function search() {
    if (nameSearch == '') {
      alert('Preencha o campo de pesquisa')
      return
    }

    setVolunteersCard(spinnner)

    setTimeout(() => {
      var volunteersFind = volunteers.filter(volunteer =>
        volunteer.librarian_name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
      )

      if (volunteersFind.length === 0) {
        return setVolunteersCard(
          <img id="book-notFound"
            src={require('../images/livro-nao-encontrado.png')}
            alt='Not Found' />
        )
      }

      const dataCard = volunteersFind.map(volunteer => {
        return (
          <CardVoluntario
            key={volunteer.librarian_code}
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

    if (volunteers.length === 0) {
      setVolunteersCard(
        <img id="book-notFound"
          src={require('../images/livro-nao-encontrado.png')}
          alt='Not Found' />
      )
    }

    const dataCard = volunteers.map(volunteer => {
      return (
        <CardVoluntario
          key={volunteer.librarian_code}
          id={volunteer.librarian_code}
          name={volunteer.librarian_name}
          email={volunteer.librarian_email}
          user={volunteer.librarian_user}
        />
      )
    })

    setVolunteersCard(dataCard)
    setIsDisabled(false)
  }

  useEffect(() => {
    loadVolunteers()
  }, [])

  function handleKeyDown(e){
    if (e.key === 'Enter') {
      search()
    }
  }

  return (
    <>
      <Navbar />
      <div className="pagina-container">
        <div className="titulo-container">
          <h1>Voluntários</h1>
          <div className="btn-cadastrar-container">
            <ModalCadastrarVoluntario />
          </div>
        </div>
        <div className="pesquisar-container">
          <input className="input-pesquisa" type="text" placeholder="Pesquise aqui"
            onKeyDown={handleKeyDown}
            onChange={e => setNameSearch(e.target.value)} />
          <div className="btn-container">
            <button className="btn-pesquisar" onClick={search} disabled={isDisabled}><FaSearch /></button>
          </div>
        </div>
        <div className="cards-container">
          {volunteersCard}
        </div>
      </div>
    </>
  )
}
