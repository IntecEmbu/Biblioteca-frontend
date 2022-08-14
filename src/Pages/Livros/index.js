import React, { useEffect } from 'react'
import CardBook from '../../Components/CardBook/index.js'
import api from '../../Service/api.js'
import './index.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

function LivrosPage() {

    const [booksCard, setBooksCard] = React.useState(
        <div id='area-loading'>
            <Spinner id="loading" animation='border'/>
        </div>
    )

    const [nameSearch, setNameSearch] = React.useState('')

    const [selectValue, setSelectValue] = React.useState(1);  
    const list = [
        {id: 1, name: 'TÍTULO'},
        {id: 2, name: 'CATEGORIA'},
        {id: 3, name: 'AUTOR'}
    ];

    async function search() {

        if(nameSearch === ''){
            alert('Preencha o campo de busca')
            return
        }

        if(selectValue == 1){
            var response = await api.get(`/book/search-name?name=${nameSearch}`)
        }
        else if(selectValue == 2){
            var response = await api.get(`/book/search-category?category=${nameSearch}`)
        }
        else if(selectValue == 3){
            var response = await api.get(`/book/search-author?author=${nameSearch}`)
        }

        // Caso não encontre nenhum livro, mostra uma mensagem
        if(response.status === 204){
            alert('Nenhum livro encontrado')
            return
        }

        const dataCard = response.data.books.map(book => {
            return (
                <CardBook 
                book_name={book.book_name} 
                book_isbn={book.book_isbn}
                book_cdd={book.book_cdd} 
                release_year={book.release_year}
                category_name={book.category_name}
                book_language={book.book_language}
                book_author={book.book_author} />
            )
        })

        setBooksCard(dataCard)
    }

    useEffect(() => {
        api.get('/book/all').then(response => {
            
            const data = response.data.books

            const teste = data.map(book => {
                return (
                    <CardBook 
                    book_name={book.book_name} 
                    book_isbn={book.book_isbn}
                    book_cdd={book.book_cdd} 
                    release_year={book.release_year}
                    category_name={book.category_name}
                    book_language={book.book_language} 
                    book_author={book.book_author}/>
                )
            })

            setBooksCard(teste)
        })
    } , [])

    return (
        <div className="livros-page">

            <Form id='area-pesquisa' autoComplete="off">

                <Form.Control id='input-pesquisa' type="text"
                onChange={e => setNameSearch(e.target.value)}/>

                <Form.Select id='tipo-pesquisa' value={selectValue} onChange={e => setSelectValue(e.target.value)}>
                    {list.map((item) => (
                    <option value={item.id}>{item.name}</option>
                    ))}        
                </Form.Select>

                <Button id="FormButton" onClick={search}>PESQUISAR</Button>
        
            </Form>

            <div id="area-card-books">
                {booksCard}
            </div>
        </div>
    )
}

export default LivrosPage