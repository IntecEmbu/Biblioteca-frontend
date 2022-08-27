import React, { useEffect } from 'react'
import CardBook from '../../components/CardBook/CardBook.js'
import api from '../../service/api.js'
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar/Navbar.js'
import '../../styles/PesquisarLivro.css'
import downloadBook from '../../service/seachBook.js';

function LivrosPage() {
    // Efeito de carregamento da página.
    const spinnner =
        <div className='area-loading'>
            <Spinner id="loading" animation='border' />
        </div>

    // Hook para carregar os dados do livro.
    const [booksCard, setBooksCard] = React.useState(spinnner)

    // Hook que armazena o nome a ser pesquisado.
    const [nameSearch, setNameSearch] = React.useState('')

    // Hooks que guardam os tipos de pesquisa.
    const [selectValue, setSelectValue] = React.useState(1);
    const list = [
        { id: 1, name: 'TÍTULO' },
        { id: 2, name: 'CATEGORIA' },
        { id: 3, name: 'AUTOR' }
    ];

    async function search() {

        

        // Atualiza o estado com os livros encontrados.
        // setBooksCard(dataCard)
    }

    // Função padrão de carregamento da página.
    async function loadBooks() {
        
        await downloadBook()

        const data = localStorage.getItem('books')

        console.log(data)

        // Organiza os dados chamando os cards dos livros.
        // var cards = data.map(book => {
        //     return (
        //         <CardBook
        //             book_name={book.book_name}
        //             book_author={book.book_author}
        //             book_edition={book.book_edition}
        //             release_year={book.release_year}
        //             category_name={book.category_name}
        //             book_language={book.book_language}
        //             book_isbn={book.book_isbn}
        //             book_cdd={book.book_cdd} />
        //     )
        // })
        // setBooksCard(cards)
    }

    // Carregamento padrão da página.
    useEffect(() => {
        loadBooks()
    }, [])

    return (
        <div>
            <Navbar />
            <h1 className="titulo-pagina">Pesquisar Livro</h1>
            <div className="pesquisa-container">
                <input className="input-pesquisa" type="text" onChange={e => setNameSearch(e.target.value)} />
                <select className="tipo-pesquisa" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {list.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <div className="container-btn-pesquisar">
                    <button className="btn-pesquisar" onClick={search}>Pesquisar</button>
                </div>
            </div>
            <div id="area-card-books">
                {booksCard}
            </div>
        </div >
    )
}

export default LivrosPage