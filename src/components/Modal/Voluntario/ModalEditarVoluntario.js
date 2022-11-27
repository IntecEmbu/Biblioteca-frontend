import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../../../service/api";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

function ModalEditarVoluntario({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = data.id;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [user, setUser] = useState(data.user);
  const [type, setType] = useState(data.type);
  const [status, setStatus] = useState(data.status);

  const [isDisabled, setIsDisabled] = useState(false);

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    hideProgressBar: true,
    closeButton: false,
  };

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  function validate() {
    toast.dismiss();
    
    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email("Email inválido").required("Email é obrigatório"),
      user: yup.string().required("Usuário é obrigatório"),
    });

    try{
      schema.validateSync({ name, email, user });
      setErrors({});
      return true;
    } catch(err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      toast.warning("Preencha os campos corretamente", toastConfig);
      setErrors(validationErrors);
      return false;
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
          type,
          status,
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
                    setName(e.target.value.trim());
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
                    setEmail(e.target.value.trim());
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
                    setUser(e.target.value.trim());
                    setErrors({ ...errors, user: "", count: "" });
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.user && <p className="error-message">{errors.user}</p>}
              </div>

              <div className="input-box-modal">
                <label>Tipo</label>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value.trim());
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <option value="Colaborador">Colaborator</option>
                  <option value="Bibliotecario">Bibliotecário</option>
                </select>
              </div>

              <div className="input-box-modal">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value.trim());
                  }}
                  onKeyDown={handleKeyDown}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </div>
          </form>
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
