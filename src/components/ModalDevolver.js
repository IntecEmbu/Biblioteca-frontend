import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
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
      alert('Devolvido com sucesso!')
      window.location.reload()
    } catch(err){
      alert('Erro ao devolver!')
      console.log(err)
    }

    setIsDisabled(false)
  }

  return (
    <>
      <button className="btn-devolver-card" onClick={handleShow}>
        Devolver
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Devolver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja devolver?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" 
          onClick={handleClose}
          disabled={isDisabled}>
            Cancelar
          </button>
          <button className="btn-devolver-modal" 
          onClick={deleteitem}
          disabled={isDisabled}>
            Devolver
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalExcluir