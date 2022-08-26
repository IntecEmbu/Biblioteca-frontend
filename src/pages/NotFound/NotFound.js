import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/NotFound.css'

function index() {
  return (
    <div>
        <Link to="/" className='link' id='homeLink'>
            <div id='msgError'>
                <span>Página não feita<br />Clique aqui para ir à home</span>
            </div>
        </Link>
    </div>
  )
}

export default index