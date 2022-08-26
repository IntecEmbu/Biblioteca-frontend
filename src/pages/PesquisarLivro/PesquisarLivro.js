import React, { useEffect } from 'react'
import CardBook from '../../components/CardBook/CardBook.js'
import api from '../../service/api.js'
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar/Navbar.js'
import '../../styles/PesquisarLivro.css'

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

        // Caso o usuário não digite nada, ele alerta que deve ser digitado algo.
        if (nameSearch === '') {
            alert('Preencha o campo de busca!')
            return
        }
        setBooksCard(spinnner)

        // Verifica qual o tipo de busca será feita.
        if (selectValue == 1) {
            var response = await api.get(`/book/search-name?name=${nameSearch}`)
        }
        else if (selectValue == 2) {
            var response = await api.get(`/book/search-category?category=${nameSearch}`)
        }
        else if (selectValue == 3) {
            var response = await api.get(`/book/search-author?author=${nameSearch}`)
        }

        // Caso não encontre nenhum livro, exibe uma mensagem e mostra todos os livros.
        if (response.status === 204) {
            loadBooks()
            alert('Nenhum livro encontrado!')
            return
        }

        // Caso encontre livros, mostra os livros encontrados.
        const dataCard = response.data.books.map(book => {
            return (
                <CardBook
                    book_name={book.book_name}
                    book_isbn={book.book_isbn}
                    book_cdd={book.book_cdd}
                    release_year={book.release_year}
                    category_name={book.category_name}
                    book_language={book.book_language}
                    book_author={book.book_author}
                    book_edition={book.book_edition} />
            )
        })

        // Atualiza o estado com os livros encontrados.
        setBooksCard(dataCard)
    }

    // Função padrão de carregamento da página.
    async function loadBooks() {
        const response = await api.get('/book/all')

        const data = response.data.books

        // Organiza os dados chamando os cards dos livros.
        var cards = data.map(book => {
            return (
                <CardBook
                    book_name={book.book_name}
                    book_isbn={book.book_isbn}
                    book_cdd={book.book_cdd}
                    release_year={book.release_year}
                    category_name={book.category_name}
                    book_language={book.book_language}
                    book_author={book.book_author}
                    book_edition={book.book_edition} />
            )
        })
        setBooksCard(cards)
    }

    // Carregamento padrão da página.
    useEffect(() => {
        loadBooks()
    }, [])

    return (
        <div>
            <Navbar />
            <h1 className="titulo-pagina">Pesquisar Livro</h1>
            <form className="form-pesquisa" autoComplete="off">
                <input id='input-pesquisa' type="text" onChange={e => setNameSearch(e.target.value)} />
                <select id='tipo-pesquisa' value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {list.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <button className="btn-pesquisar" onClick={search}>Pesquisar</button>
            </form>
            <div id="area-card-books">
                {booksCard}
            </div>
        </div>
    )
}

export default LivrosPage