import React from 'react'
import './index.css'

function Index() {

    // Coleta os dados do livro selecionado
    const dados = JSON.parse(localStorage.getItem('book_selected'))

    return (
    <div id='area-bookSelected'>
        <h3>TITULO: {dados.book_name}</h3>
        <p className='p-bookSelected'>ISBN: {dados.book_isbn}</p>
        <p className='p-bookSelected'>CDD: {dados.book_cdd}</p>
        <p className='p-bookSelected'>LANÇAMENTO: {dados.release_year}</p>
        <p className='p-bookSelected'>CATEGORIA: {dados.category_name}</p>
        <p className='p-bookSelected'>IDIOMA: {dados.book_language}</p>
        <p className='p-bookSelected'>AUTOR: {dados.book_author}</p>
        <p className='p-bookSelected'>EDIÇÃO: {dados.book_edition}</p>
        <p className='p-bookSelected'>ID: {dados.book_code}</p>
    </div>
    )
}

export default Index