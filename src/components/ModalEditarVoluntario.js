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

  function validate() {
    let errors = {};
    let count = 0;

    // Validação do nome
    if (!name) {
      errors.name = "Campo obrigatório";
      count++;
    } else if (name.length > 100) {
      errors.name = "Nome muito longo";
      count++;
    }

    // Validação do email
    if (!email) {
      errors.email = "Campo obrigatório";
      count++;
    } else if (email.length > 100) {
      errors.email = "Email muito longo";
      count++;
    } else if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.length < 6
    ) {
      errors.email = "Email inválido";
      count++;
    }

    // Validação do usuário
    if (!user) {
      errors.user = "Campo obrigatório";
      count++;
    } else if (user.length > 100) {
      errors.user = "Usuário muito longo";
      count++;
    }

    if (count > 0) {
      errors.count = `Existem ${count} campos preenchidos incorretamente`;
    }

    // Casso não haja erros, o objeto errors estará vazio e irá retornar true
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      return true;
    }
  }

  async function updateVolunter() {
    if (validate()) {
      try {
        setIsDisabled(true);
        await api.put("/librian/update-collaborator", {
          id,
          name,
          email,
          user,
        });
        setSuccess(true);
        setIsDisabled(false);
      } catch (err) {
        alert("Erro ao atualizar voluntário!");
        console.log(err);
        setIsDisabled(false);
      } finally {
        await close();
      }
    }
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
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: "", count: "" });
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "", count: "" });
                  }}
                  type="email"
                  onKeyDown={handleKeyDown}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Usuário</label>
                <input
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                    setErrors({ ...errors, user: "", count: "" });
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.user && <p className="error-message">{errors.user}</p>}
              </div>
            </div>
          </form>
          {errors.count && (
            <p className="error-count-message">{errors.count}</p>
          )}
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
          {success && (
            <p className="success-message">Volutário atualizado com sucesso!</p>
          )}
        </Modal.Body>
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
