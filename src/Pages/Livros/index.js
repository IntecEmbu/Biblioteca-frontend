import React, { useEffect } from 'react'
import CardBook from '../../Components/CardBook/index.js'
import api from '../../Service/api.js'

function LivrosPage() {

    const [booksCard, setBooksCard] = React.useState([])

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
        <div>
            {booksCard}
        </div>
    )
}

export default LivrosPage