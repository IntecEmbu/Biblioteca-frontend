import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaEllipsisH } from "react-icons/fa"

function Example(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-editar-card" onClick={handleShow}>
        <FaEllipsisH />
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Detalhes do Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Qtd. Total</label>
                <input
                  value={props.total}
                  readOnly
                />
              </div>

              <div className="input-box-modal">
                <label>Qtd. Parado</label>
                <input
                  value={props.stopped}
                  readOnly
                />
              </div>

              <div className="input-box-modal">
                <label>Qtd. Circulção</label>
                <input
                  value={props.circulation}
                  readOnly
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-cancelar-modal"
            onClick={handleClose}
          >
            Voltar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example