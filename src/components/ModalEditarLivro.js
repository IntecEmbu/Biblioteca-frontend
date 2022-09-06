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
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Título</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Autor</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Edição</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Ano de Lançamento</label>
                <input
                  type="number"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Categoria</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>CDD</label>
                <input
                  type="text"
                  required
                />
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