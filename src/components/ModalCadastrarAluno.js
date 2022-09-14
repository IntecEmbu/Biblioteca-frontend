import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import '../styles/Modal.css'
import '../styles/Botoes.css'
import api from '../service/api.js'

function Example() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [phone, setPhone] = useState(''),
        [course, setCourse] = useState(''),
        [type, setType] = useState('Aluno')

  const [isDisabled, setIsDisabled] = useState(false)
  
  async function sendUser() {
    const data = {
      name, email,
      phone, course,
      type
    }

    if (name === '' || email === '' || phone === '' || course === '' || type === '') {
      alert('Preencha todos os campos')
    } else {
      const confirm = window.confirm('Deseja cadastrar o aluno?')
      if (confirm) {
        try {
          setIsDisabled(true)
          await api.post('/user/insert', data)
          alert('Aluno cadastrado com sucesso!')
          setIsDisabled(false)
        } catch (error) {
          alert('Erro ao cadastrar o aluno!')
          console.log(error)
          setIsDisabled(false)
        }
        window.location.reload()
      }
    }
  }

  return (
    <>
      <button className="btn-cadastrar" onClick={handleShow}>
        Cadastrar Aluno
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Cadastrar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                type="text"
                required 
                onChange={e => setName(e.target.value)}
                />
              </div>

              <div className="input-box-modal">
                <label>Curso</label>
                <input
                type="text"
                required 
                onChange={e => setCourse(e.target.value)}
                />
              </div>
          
              /*
              <div className="input-box-modal">
                <label>CPF</label>
                <input
                type="text"
                required 
                onChange={e => setCourse(e.target.value)}
                />
              </div>
              */

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                type="text"
                required 
                onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="input-box-modal">
                <label>Celular</label>
                <input
                type="text"
                required 
                onChange={e => setPhone(e.target.value)}
                />
              </div>

              <div className="input-box-modal">
                <label>Tipo</label>
                <select className="tipo-pesquisa" value={type} onChange={e => setType(e.target.value)}>
                  <option value={'Aluno'}>ALUNO</option>
                  <option value={'Funcionario'}>FUNCIONÁRIO</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-cadastrar-modal" onClick={sendUser} disabled={isDisabled}>
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example
