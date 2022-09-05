import React, { useEffect } from 'react'
import CardBook from '../components/CardBook.js'
import Spinner from 'react-bootstrap/Spinner'
import Navbar from '../components/Navbar.js'
import downloadBook from '../service/seachBook.js'
import { FaSearch } from "react-icons/fa"
import '../styles/PesquisarLivro.css'

function LivrosPage() {
    // Efeito de carregamento da página.
    const spinnner =
        <div className='area-loading'>
            <Spinner id="loading" animation='border' />
        </div>

    const [isDisabled, setIsDisabled] = React.useState(true)
    const [booksCard, setBooksCard] = React.useState(spinnner)
    const [nameSearch, setNameSearch] = React.useState('')
    const [selectValue, setSelectValue] = React.useState('title')
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

            // Faz a pesquisa no Hook.
            if (selectValue === 'title') {
                var booksFind = books.filter(book => 
                    book.book_name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
                )
            } else if (selectValue === 'category') {
                var booksFind = books.filter(
                    book => book.category_name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
                )
            } else if (selectValue === 'author') {
                var booksFind = books.filter(book => 
                    book.book_author.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase())
                )
            }

            // Caso não encontre nenhum livro, exibe uma mensagem.
            if (booksFind.length === 0) {
                setBooksCard(
                    <img id="book-notFound" 
                    src={require('../images/livro-nao-encontrado.png')} 
                    alt='Not Found' />
                )

                return
            }

            // Coloca os livros encontrados no Hook.
            const dataCard = booksFind.map(book => {
                return (
                    <CardBook
                        id={book.book_code}
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
            return setBooksCard(
                <img id="book-notFound" 
                    src={require('../images/livro-nao-encontrado.png')} 
                    alt='Not Found' />
            )
        }

        // Organiza os dados chamando os cards dos livros.
        const cards = data.books.map(book => {
            return (
                <CardBook
                    key={book.book_code}
                    name={book.book_name}
                    author={book.book_author}
                    edition={book.book_edition}
                    release_year={book.release_year}
                    category={book.category_name}
                    language={book.book_language}
                    isbn={book.book_isbn}
                    cdd={book.book_cdd} />
            )
        })
        setBooksCard(cards)
        setIsDisabled(false)
    }

    // Carregamento padrão da página.
    useEffect(() => {
        loadBooks()
    }, [])

    return (
        <div>
            <Navbar />
            <h1 className="titulo-pagina">Pesquisar Livro</h1>
            <div className="pesquisar-container">
                <input className="input-pesquisa" type="text" placeholder="Título, categoria ou autor" 
                onChange={e => setNameSearch(e.target.value.trim())} />
                <select className="tipo-pesquisa" 
                value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    <option value={'title'}>TÍTULO</option>
                    <option value={'category'}>CATEGORIA</option>
                    <option value={'author'}>AUTOR</option>
                </select>
                <div className="btn-pesquisar-container">
                    <button className="btn-pesquisar" onClick={search} disabled={isDisabled}><FaSearch /></button>
                </div>
            </div>
            <div id="area-card-books">
                {booksCard}
            </div>
        </div >
    )
}

export default LivrosPage