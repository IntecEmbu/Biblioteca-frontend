import React, { useState, useEffect } from "react";
import { FaShareSquare } from "react-icons/fa";
import api from "../../../service/api";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import InputMask from "react-input-mask";
import * as yup from "yup";
import cpfValidate from "../../../utils/validateCPF.js"

function ModalEditarAluno({ book_id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors({});
    setUserCpf("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [librarian_id, setLibrarianId] = useState(
    JSON.parse(sessionStorage.getItem("user")).librarian_code
  );
  const [user_cpf, setUserCpf] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  function formatCpf(number) {
    // Deixa o cpf no formato 000.000.000-00
    return setUserCpf(
      number.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    );
  }

  function validate() {

    const schema = yup.object().shape({
      user_cpf: yup.string().required("CPF é obrigatório")
        .test(user_cpf, "CPF inválido", cpfValidate)
    });

    try {
      schema.validateSync({ user_cpf }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  }

  async function lending() {
    if (validate()) {
      setErrors({});
      setIsDisabled(true);

      try {
        await api.post("/lending/insert", {
          book_id,
          librarian_id,
          user_cpf,
        });

        setErrors({});
        setSuccess(true);
        setIsDisabled(false);

        await close();
      } catch (err) {
        // console.log(err.response.data);
        setErrors({ api: err.response.data.error });

        setIsDisabled(false);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      lending();
    }
  }

  return (
    <>
      <button className="btn-emprestar-card desktop" onClick={handleShow}>
        Emprestar
      </button>

      <button className="btn-emprestar-card mobile" onClick={handleShow}>
        <FaShareSquare />
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Emprestar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group-modal">
            <div className="input-box-modal">
              <label>CPF</label>
              <InputMask
                mask="999.999.999-99"
                maskChar=""
                value={user_cpf}
                onChange={(e) => {
                  formatCpf(e.target.value.trim());
                  setErrors({});
                }}
                onKeyDown={handleKeyDown}
              ></InputMask>
              {errors.user_cpf && (
                <span className="error-message">{errors.user_cpf}</span>
              )}
              {success && (
                <span className="success-message">
                  Emprestimo realizado com sucesso!
                </span>
              )}
              {isDisabled && (
                <div className="loading-modal">
                  <Spinner animation="border" />
                </div>
              )}
              {errors.api && (
                <span className="error-message">{errors.api}</span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-cancelar-modal"
            onClick={handleClose}
            disabled={isDisabled}
          >
            Cancelar
          </button>
          <button
            className="btn-emprestar-modal"
            onClick={lending}
            disabled={isDisabled}
          >
            Emprestar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditarAluno;
