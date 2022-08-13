import React, { useEffect } from 'react'
import CardBook from '../../Components/CardBook/index.js'
import api from '../../Service/api.js'
import './index.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';

function LivrosPage() {

    const [booksCard, setBooksCard] = React.useState([])
    const [typeSearch, setTypeSearch] = React.useState('')
    const [nameSearch, setNameSearch] = React.useState('')

    async function search() {

        if(nameSearch === ''){
            alert('Preencha o campo de busca')
            return
        }

        const response = await api.get(`/book/seach-${typeSearch}?${typeSearch}=${nameSearch}`)
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
                    book_language={book.book_language} />
                )
            })

            setBooksCard(teste)
        })
    } , [])

    return (
        <div className="livros-page">

            <div id='area-pesquisa'>

                <Form.Control id='input-pesquisa' type="text"
                onChange={e => setNameSearch(e.target.value)}/>

                <Form.Select id='tipo-pesquisa'>
                    <option >CATEGORIA</option>
                    <option >NOME</option>
                </Form.Select>


                <Button variant="secondary" id="btn-pesquisa" onClick={search}>PESQUISAR</Button>
        
            </div>

            <div id="area-card-books">
                {booksCard}
            </div>
        </div>
    )
}

export default LivrosPage