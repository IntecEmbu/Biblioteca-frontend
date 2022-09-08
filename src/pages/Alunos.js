import React, { useEffect } from 'react'
import CardAluno from '../components/CardAluno.js'
import Navbar from '../components/Navbar.js'
import ModalCadastrarAluno from '../components/ModalCadastrarAluno.js'
import { FaSearch } from "react-icons/fa"
import Spinner from 'react-bootstrap/Spinner'
import downloadUser from '../service/searchUser.js'
import '../styles/Botoes.css'

export default function Alunos() {

  const spinnner =
    <div className='area-loading'>
      <Spinner id="loading" animation='border' />
    </div>


  const [userCard, setUserCard] = React.useState(spinnner)
  const [isDisabled, setIsDisabled] = React.useState(true)
  const [nameSearch, setNameSearch] = React.useState('')
  const [selectValue, setSelectValue] = React.useState('name')
  const [users, setUsers] = React.useState([])

  async function search() {

    if (nameSearch == '') {
      alert('Preencha o campo de pesquisa')
      return
    }

    setUserCard(spinnner)

    setTimeout(() => {
      if (selectValue === 'name') {
        var usersFind = users.filter(user =>
          user.user_name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
        )
      } else if (selectValue === 'course') {
        var usersFind = users.filter(user =>
          user.user_course.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
        )
      }

      if (usersFind.length === 0) {
        return setUserCard(
          <img id="book-notFound"
            src={require('../images/livro-nao-encontrado.png')}
            alt='Not Found' />
        )
      }

      const dataCard = usersFind.map(user => {
        return (
          <CardAluno
            key={user.user_id}
            id={user.user_code}
            name={user.user_name}
            email={user.user_email}
            phone={user.user_phone}
            course={user.user_course}
            type={user.user_type}
          />
        )
      })

      setUserCard(dataCard)
    }, 100)
  }

  async function loadUser() {
    const data = await downloadUser()

    setUsers(data)

    if (data.length == 0) {
      setUserCard(
        <img id="book-notFound"
          src={require('../images/livro-nao-encontrado.png')}
          alt='Not Found' />
      )
    }

    const cards = data.map((user) => {
      return (
        <CardAluno
          key={user.user_code}
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
    setIsDisabled(false)
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className="titulo-pagina">Alunos</h1>
        <div className="pesquisar-container">
          <input className="input-pesquisa" type="text" placeholder="Nome ou curso"
            onChange={e => setNameSearch(e.target.value.trim())} />
          <select className="tipo-pesquisa"
            value={selectValue} onChange={e => setSelectValue(e.target.value)} >
            <option value={'name'}>NOME</option>
            <option value={'course'}>CURSO</option>
          </select>
          <div className="btn-container">
            <div className="btn-pesquisar2-container">
              <button className="btn-pesquisar" onClick={search} disabled={isDisabled}><FaSearch /></button>
            </div>
            <div className="btn-cadastrar-container">
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
