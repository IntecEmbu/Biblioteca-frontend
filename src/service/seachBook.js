import api from './api.js'

async function downloadBook(){
    const books = await api.get('/book/all')

    return books.data
}

export default downloadBook