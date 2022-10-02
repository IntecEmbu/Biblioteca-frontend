import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api";
import Spinner from "react-bootstrap/Spinner";

function ModalEditarVoluntario({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = data.id;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [user, setUser] = useState(data.user);

  const [spinner, setSpinner] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  async function updateVolunter() {
    setIsDisabled(true);

    try {
      await api.put("/librian/update-collaborator", {
        id,
        name,
        email,
        user,
      });
      alert("Voluntário atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar voluntário!");
      console.log(err);
    }

    setSpinner("");
    setIsDisabled(false);
    handleClose();
    window.location.reload();
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      updateVolunter();
    }
  }

  return (
    <>
      <button className="btn-editar-card" onClick={handleShow}>
        <FaPen className="fa-pen" />
        Editar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Editar Voluntário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                />
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                />
              </div>

              <div className="input-box-modal">
                <label>Usuário</label>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                />
              </div>

              {/* <div className="input-box-modal">
                <label>Senha</label>
                <input
                  type="password"
                  required
                />
              </div> */}
            </div>
          </form>
        </Modal.Body>
        <div className="spinner-login">{spinner}</div>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button className="btn-editar-modal" onClick={updateVolunter}>
            <FaPen className="fa-pen" />
            Editar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditarVoluntario;
