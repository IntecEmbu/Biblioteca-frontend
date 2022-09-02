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
        Cadastrar Aluno
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cadastrar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group">
              <div className="input-linha">
                <div className="input-box">
                  <label>Nome</label>
                  <input type="text" required />
                </div>

                <div className="input-box">
                  <label>Curso</label>
                  <input type="text" required />
                </div>

                <div className="input-box">
                  <label>Email</label>
                  <input type="text" required />
                </div>
              </div>

              <div className="input-linha">
                <div className="input-box">
                  <label>Celular</label>
                  <input type="text" required />
                </div>

                <div className="input-box">
                  <label>Tipo</label>
                  <select className="tipo-pesquisa">
                    <option>ALUNO</option>
                    <option>FUNCIONÁRIO</option>
                  </select>
                </div>
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