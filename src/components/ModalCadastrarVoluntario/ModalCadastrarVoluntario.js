import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import '../../styles/ModalCadastrarVoluntario.css'

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="btn-cadastrar-voluntario" onClick={handleShow}>
        Cadastrar
      </button>

      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cadastrar Voluntário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Email</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Usuário</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>Senha</label>
                <input type="password" required />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-cadastrar-voluntario" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-cadastrar-cadastrar-voluntario" onClick={handleClose}>
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example