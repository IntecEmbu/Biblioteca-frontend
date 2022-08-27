import api from './api.js'

async function downloadBook(){
    const books = await api.get('/book/all')

    localStorage.setItem('books', books.data.books)
}

export default downloadBook;