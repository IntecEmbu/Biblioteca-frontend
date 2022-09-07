import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt} from "react-icons/fa"
import api from '../service/api'
import '../styles/Modal.css'

function ModalExcluir({path, id}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDisabled, setIsDisabled] = useState(false)

  async function deleteitem(){
    setIsDisabled(true)

    try{
      await api.delete(`${path}?id=${id}`)
      alert('Excluido com sucesso!')
      window.location.reload()
    } catch(err){
      alert('Erro ao excluir!')
      console.log(err)
    }

    setIsDisabled(false)
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

export default ModalExcluir