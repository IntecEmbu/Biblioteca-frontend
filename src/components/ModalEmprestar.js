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
  const [name, setName] = useState(data.name)
  const [email, setEmail] = useState(data.email)
  const [phone, setPhone] = useState(data.phone)
  const [course, setCourse] = useState(data.course)
  const [type, setType] = useState(data.type)

  const [spinner, setSpinner] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  async function updateUser(){
    setSpinner(<Spinner id="loading" animation='border' />)
    setIsDisabled(true)

    try{
      await api.put('/user/update-user', {
        id, name, email, phone, course, type
        })
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
          <button className="btn-emprestar-modal" onClick={updateUser} disabled={isDisabled}>
            Emprestar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditarAluno