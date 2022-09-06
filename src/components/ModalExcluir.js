import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaTrashAlt, FaPen } from "react-icons/fa"
import '../styles/Modal.css'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-excluir-card" onClick={handleShow}><FaTrashAlt className="fa-trash" />Excluir</button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Excluir</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir?</Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-excluir-modal">
            <FaTrashAlt className="fa-trash" />
            Excluir
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example