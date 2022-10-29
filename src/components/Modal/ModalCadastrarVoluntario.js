import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import api from "../../service/api.js";
import "../../styles/Modal.css";
import "../../styles/Botoes.css";
import { Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

function Example() {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
    setErrors({});
  }
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

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
    closeButton: false
  };

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  function validate() {
    toast.dismiss()

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email("Email inválido").required("Email é obrigatório"),
      password: yup.string().required("Senha é obrigatória"),
      user: yup.string().required("Usuário é obrigatório")
    });

    try{
      schema.validateSync({ name, email, password, user }, { abortEarly: false });
      setErrors({});
      return true;
    } catch(err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      toast.warning("Preencha os campos corretamente", toastConfig);
      setErrors(validationErrors);
      return false;
    }
  }

  async function sendUser() {
    if (validate()) {
      const data = {
        name,
        email,
        password,
        user,
      };

      try {
        setIsDisabled(true);
        await api.post("/librian/insert-collaborator", data);
        setIsDisabled(false);
        setSuccess(true);
      } catch (error) {
        alert("Verifique os dados e tente novamente");
        console.log(error);
        setIsDisabled(false);
      } finally {
        await close();
      }
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      sendUser();
    }
  }

  return (
    <>
      <ToastContainer {...toastConfig} />
      <button className="btn-cadastrar desktop" onClick={handleShow}>
        Cadastrar Voluntário
      </button>

      <button className="btn-cadastrar mobile" onClick={handleShow}>
        Cadastrar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Cadastrar Voluntário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Usuário</label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setUser(e.target.value);
                    setErrors({ ...errors, user: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.user && <p className="error-message">{errors.user}</p>}
              </div>

              <div className="input-box-modal">
                <label>Senha</label>
                <input
                  type="text"
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({ ...errors, password: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.password && (
                  <p className="error-message">{errors.password}</p>
                )}
              </div>
            </div>
          </form>
          {success && (
            <p className="success-message">
              Voluntário cadastrado com sucesso!
            </p>
          )}
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn-cadastrar-modal"
            onClick={sendUser}
            disabled={isDisabled}
          >
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
