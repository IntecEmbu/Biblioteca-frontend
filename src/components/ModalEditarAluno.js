import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaPen } from 'react-icons/fa';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-editar-card" onClick={handleShow}>
        <FaPen className="fa-pen" />
        Editar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Editar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Curso</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>CPF</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  type="email"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Celular</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Tipo</label>
                <select className="tipo-pesquisa">
                  <option>ALUNO</option>
                  <option>FUNCIONÁRIO</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-editar-modal">
            <FaPen className="fa-pen" />
            Editar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example