import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/NotFound.css'

function index() {

  return (
<<<<<<< HEAD
    <div className="not-found-container">
      <div className="img-error-container">
        <img className="img-error" src={require('../../images/404-error.png')} />
      </div>
      <div className="btn-voltar-home-container">
        <Link to="/" className="link-not-found"><button className="btn-voltar-home">Voltar para a home</button></Link>
        
      </div>
=======
    <div>
        <Link className='link' id='homeLink' to='/'>
            <div id='msgError'>
                <img id='img-error' src={require('../../components/Imagens/404Error.png')} />
            </div>
        </Link>
>>>>>>> 3f516ee6b7b749279c999f9476d12c010121d949
    </div>
  )
}

export default index