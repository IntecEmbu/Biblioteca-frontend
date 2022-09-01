import React, { useEffect } from 'react'
import CardBook from '../../components/CardBook/CardBook.js'
import api from '../../service/api.js'
import Spinner from 'react-bootstrap/Spinner';
import Navbar from '../../components/Navbar/Navbar.js'
import downloadBook from '../../service/seachBook.js';
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

    // Hooks que armazena os livros encontrados.
    const [books, setBooks] = React.useState([])

    async function search() {
        // Verifica se o nome foi preenchido.

        if (nameSearch === '') {
            alert('Preencha o campo de pesquisa')
            return
        }

        setBooksCard(spinnner)

        // Colocando delay para experiencia do usuário.
        setTimeout(() => {

            // Verifica se o usuário selecionou o tipo de pesquisa.
            const typeSearch = selectValue == 1 ? 'title' : 
            selectValue == 2 ? 'category' : 'author'

            // Faz a pesquisa no Hook.
            if (typeSearch === 'title') {
                var booksFind = books.filter(book => book.book_name.includes(nameSearch))
            } else if (typeSearch === 'category') {
                var booksFind = books.filter(book => book.category_name.includes(nameSearch))
            } else if (typeSearch === 'author') {
                var booksFind = books.filter(book => book.author_name.includes(nameSearch))
            }

            // Caso não encontre nenhum livro, exibe uma mensagem.
            if (booksFind.length === 0) {
                setBooksCard(
                    <img id="book-notFound" 
                    src={require('../../images/livro-nao-encontrado.png')} 
                    alt='Not Found' />
                )

                return
            }

            // Coloca os livros encontrados no Hook.
            const dataCard = booksFind.map(book => {
                return (
                    <CardBook
                        book_name={book.book_name}
                        book_author={book.book_author}
                        book_edition={book.book_edition}
                        release_year={book.release_year}
                        category_name={book.category_name}
                        book_language={book.book_language}
                        book_isbn={book.book_isbn}
                        book_cdd={book.book_cdd} />
                )
        })

        // Atualiza o estado com os livros encontrados.
        setBooksCard(dataCard)
        }, 100)
    }

    // Função padrão de carregamento da página.
    async function loadBooks() {
        
        const data = await downloadBook()
        setBooks(data.books)

        if(data.length == 0){
            return (
                <img id="book-notFound" 
                    src={require('../../images/livro-nao-encontrado.png')} 
                    alt='Not Found' />
            )
        }

        // Organiza os dados chamando os cards dos livros.
        var cards = data.books.map(book => {
            return (
                <CardBook
                    book_name={book.book_name}
                    book_author={book.book_author}
                    book_edition={book.book_edition}
                    release_year={book.release_year}
                    category_name={book.category_name}
                    book_language={book.book_language}
                    book_isbn={book.book_isbn}
                    book_cdd={book.book_cdd} />
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
            <div className="pesquisa-container">
                <input className="input-pesquisa" type="text" placeholder="Título, categoria ou autor" onChange={e => setNameSearch(e.target.value.trim())} />
                <select className="tipo-pesquisa" value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {list.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
                <div className="btn-pesquisar-livro-container">
                    <button className="btn-pesquisar-livro" onClick={search}>Pesquisar</button>
                </div>
            </div>
            <div id="area-card-books">
                {booksCard}
            </div>
        </div >
    )
}

export default LivrosPage