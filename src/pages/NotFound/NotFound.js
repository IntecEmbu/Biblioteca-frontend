import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/NotFound.css'

function index() {
  return (
    <div>
        <Link to="/" className='link' id='homeLink'>
            <div id='msgError'>
                <img id='img-error' src={require('../../components/Imagens/404Error.png')} />
            </div>
        </Link>
    </div>
  )
}

export default index