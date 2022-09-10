import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-cadastrar" onClick={handleShow}>
        Cadastrar Livro
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Cadastrar Livro</Modal.Title>
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
                <label>Edição</label>
                <input
                  type="text"
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
                <label>Idioma</label>
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
                <label>Ano de Lançamento</label>
                <input
                  type="number"
                  maxLength="4"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  type="text"
                  maxLength="17"
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
          <button className="btn-cadastrar-modal">
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example