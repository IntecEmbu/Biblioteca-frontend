import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/ModalCadastrarAluno.css'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-cadastrar-aluno" onClick={handleShow}>
        Cadastrar
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cadastrar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Curso</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Email</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Celular</label>
                <input type="text" required />
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
          <button className="btn-cancelar-cadastrar-aluno" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-cadastrar-cadastrar-aluno" onClick={handleClose}>
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example