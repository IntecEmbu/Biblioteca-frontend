import React from 'react'
import Footer from '../components/Footer.js'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa"
import '../styles/Login.css'

export default function EsqueciSenha() {
  return (
    <div className='color'>
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            <div className="user">
              <input type="text" className="input-user" placeholder="Informe seu e-mail" />
            </div>
            <div className="btn-esqueci-container">
              <Link to="/login" className="link-not-found">
                <button className="btn-voltar-login"><FaArrowLeft /></button>
              </Link>
              <button className="btn-avancar">Avançar</button>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  )
}
