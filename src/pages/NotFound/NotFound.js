import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa"
import '../../styles/NotFound.css'

function index() {
  return (
    <div className="not-found-container">
      <div className="img-error-container">
        <img className="img-error" src={require('../../images/404-error.png')} />
      </div>
      <div className="btn-voltar-home-container">
        <Link to="/" className="link-not-found">
          <button className="btn-voltar-home"><FaArrowLeft /></button>
        </Link>
      </div>
    </div>
  )
}

export default index