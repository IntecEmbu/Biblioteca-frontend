import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { FaPen } from 'react-icons/fa'
import api from '../service/api'
import Spinner from 'react-bootstrap/Spinner'

function ModalEditarAluno({data}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const id = data.id
  const [book_id, setBookId] = useState(data.book_id)
  const [librarian_id, setLibrarianId] = useState(JSON.parse(localStorage.getItem('user')).librarian_code)
  const [userCpf, setUserCpf] = useState('')

  const [spinner, setSpinner] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  async function lending(){
    setSpinner(<Spinner id="loading" animation='border' />)
    setIsDisabled(true)

    try{
      await api.put('/user/update-user')
      alert('Livro emprestado!')
    } catch(err){
      alert('Erro ao emprestar o livro!')
      console.log(err)
    }

    setSpinner('')
    setIsDisabled(false)

    handleClose()
    window.location.reload()
  }

  return (
    <>
      <button className="btn-emprestar-card" onClick={handleShow}>
        Emprestar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Emprestar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>CPF</label>
                <input
                  type="text"
                  required
                  onChange={e => setUserCpf(e.target.value)}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <div className="spinner-login">
            {spinner}
        </div>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose} disabled={isDisabled}>
            Cancelar
          </button>
          <button className="btn-emprestar-modal" onClick={lending} disabled={isDisabled}>
            Emprestar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditarAluno