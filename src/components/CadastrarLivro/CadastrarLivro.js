import React from 'react'
import { Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import api from '../../service/api.js'
import '../../styles/CadastrarLivro.css'

function Index() {
    // Criação de estados para o formulário.
    const [title, setTitle] = useState(''),
        [edition, setEdition] = useState(''),
        [category, setCategory] = useState(''),
        [idiom, setIdiom] = useState(''),
        [year, setYear] = useState(''),
        [author, setAuthor] = useState(''),
        [isbn, setIsbn] = useState(''),
        [cdd, setCdd] = useState('')

    // Função para cadastrar o livro.
    async function sendBook() {
        const data = {
            title, edition,
            isbn, cdd,
            year, category,
            idiom, author
        }

        // Verifica se os campos estão preenchidos.
        if (title === '' || edition === '' || category === '' || idiom === ''
            || year === '' || author === '' || isbn === '' || cdd === '') {
            return alert('Preencha todos os campos!')
        }

        // Cofirma os dados do livro.
        const confirm = window.confirm('Deseja cadastrar o livro?')
        if (confirm) {

            try {
                await api.post('/book/insert', data) // Envia os dados para o backend.
                alert('Livro cadastrado com sucesso!')

            } catch (error) {
                alert('Erro ao cadastrar o livro!')
                console.log(error)
            }

            // Limpa os campos do formulário.
            window.location.reload()
        }
    }
    return (
        <div>
            <h1 className="titulo-pagina">Cadastrar Livro</h1>

            <div id="container">
                <div id="form-container">
                    <form>
                        <div className="input-group">
                            <div className="input-linha">
                                <div className="input-box">
                                    <label>Título</label>
                                    <input type="text" required onChange={e => setTitle(e.target.value)} />
                                </div>

                                <div className="input-box">
                                    <label>Edição</label>
                                    <input type="text" required onChange={e => setEdition(e.target.value)} />
                                </div>

                                <div className="input-box">
                                    <label>Categoria</label>
                                    <input type="text" required onChange={e => setCategory(e.target.value)} />
                                </div>
                            </div>

                            <div className="input-linha">
                                <div className="input-box">
                                    <label>Idioma</label>
                                    <input type="text" required onChange={e => setIdiom(e.target.value)} />
                                </div>

                                <div className="input-box">
                                    <label>Autor</label>
                                    <input type="text" required onChange={e => setAuthor(e.target.value)} />
                                </div>

                                <div className="input-box">
                                    <label>Ano de Lançamento</label>
                                    <input type="text" required onChange={e => setYear(e.target.value)} />
                                </div>
                            </div>

                            <div className="input-linha">
                                <div className="input-box">
                                    <label>ISBN</label>
                                    <input type="text" required onChange={e => setIsbn(e.target.value)} />
                                </div>

                                <div className="input-box">
                                    <label>CDD</label>
                                    <input type="text" required onChange={e => setCdd(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </form>

                    <button className="btn-cadastrar" onClick={sendBook}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>

    )
}

export default Index