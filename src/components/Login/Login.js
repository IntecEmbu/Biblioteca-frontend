import React from 'react'
import '../../styles/Login.css'
import { Link } from 'react-router-dom'
import login from '../../service/login.js'

function Index() {

  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function tryLogin() {

    try{
      const response = await login(user, password)
      console.log(response.message)

      localStorage.setItem('isSigned', true)
      window.location.href = '/'
      localStorage.setItem('user', user)

    } catch(err){
      console.log(err.message)
      alert('Usuário ou senha inválidos')
    }
  }

  return (
    <div className='color'>
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            <div className="logo">
              <img src={require('../Imagens/logo2.png')}></img>
            </div>
            <div className="user">
              <input type="text" className="input-user"placeholder="Usuário" 
              onChange={e => setUser(e.target.value)}/>
            </div>
            <div className="password">
              <input type="password" className="input-password" placeholder="Senha" 
              onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="btn-container">
              <button className="btn-entrar" onClick={tryLogin}>Entrar</button>
            </div>
            <p className="forgot-password">
              <Link to={'/'} className="forgot-password">Esqueci minha senha</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index