import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/Modal.css";
import "../../../styles/Botoes.css";

function Index() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-cadastrar desktop" onClick={handleShow}>
        Baixar Relatório
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Baixar Relatório</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Tipo</label>
                <select
                  className="tipo-pesquisa"
                >
                  <option>Inventário</option>
                  <option>Empréstimos</option>
                </select>
              </div>
              <div className="input-box-modal">
                <label>Formato</label>
                <select
                  className="tipo-pesquisa"
                >
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn-cadastrar-modal"
            type="submit"
          >
            Baixar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Index;