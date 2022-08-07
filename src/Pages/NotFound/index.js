import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

function index() {
  return (
    <div>
        <Link to="/cadastrolivro" className='link' id='homeLink'>
            <div id='msgError'>
                <h1>Página não feita<br />Clique aqui para ir cadastrar livro</h1>
            </div>
        </Link>
    </div>
  )
}

export default index