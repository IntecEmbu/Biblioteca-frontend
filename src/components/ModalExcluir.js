import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt, FaPen } from "react-icons/fa"
import api from '../service/api'
import '../styles/Modal.css'
import Spinner from 'react-bootstrap/Spinner'

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDisabled, setIsDisabled] = useState(false)
  const [spinner, setSpinner] = useState('')

  const way = props.way

  async function deleteitem(){
    console.log(way)
    try{
      setSpinner(<Spinner id="loading" animation='border' />)
      setIsDisabled(true)

      await api.delete(`${way}`)
      alert('Excluido com sucesso!')
      window.location.reload()
    } catch(err){
      alert('Erro ao excluir!')
      setSpinner('')
      setIsDisabled(false)
      console.log(err)
    }
  }

  return (
    <>
      <button className="btn-excluir-card" onClick={handleShow}>
        <FaTrashAlt className="fa-trash" />
        Excluir
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Excluir</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir?
          <div className="spinner-login">
            {spinner}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" 
          onClick={handleClose}
          disabled={isDisabled}>
            Cancelar
          </button>
          <button className="btn-excluir-modal" 
          onClick={deleteitem}
          disabled={isDisabled}>
            <FaTrashAlt className="fa-trash" />
            Excluir
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example