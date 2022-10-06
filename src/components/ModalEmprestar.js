import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api";
import Spinner from "react-bootstrap/Spinner";

function ModalEditarAluno({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors({});
    setUserCpf("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const id = data.id;
  const [book_id, setBookId] = useState(data.book_id);
  const [librarian_id, setLibrarianId] = useState(
    JSON.parse(sessionStorage.getItem("user")).librarian_code
  );
  const [userCpf, setUserCpf] = useState("");

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

  async function simulaReaquisição() {
    setInterval(() => {
      console.log("simulando reaquisição");
    }, 5000);
  }

  function validate() {
    let errors = {};
    let count = 0;

    // Validação do cpf
    if (!userCpf) {
      errors.userCpf = "Campo obrigatório";
      count++;
    } else if (!userCpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
      errors.userCpf = "CPF inválido";
      count++;
    }

    if (Object.keys(errors).length > 0) {
      setErrors({ ...errors, count: count });
      return false;
    } else {
      return true;
    }
  }

  async function lending() {
    if (validate()) {
      setIsDisabled(true);
      try {
        await api.post("/lending", {
          book_id,
          librarian_id,
          userCpf,
        });
        setIsDisabled(false);
        setSuccess(true);
      } catch (err) {
        // alert("Erro ao emprestar o livro!");
        // console.log(err);
        setIsDisabled(false); // Lembrar de tirar dps
        setSuccess(true);
      } finally {
        await close();
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
      <button className="btn-emprestar-card" onClick={handleShow}>
        Emprestar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Emprestar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="input-group-modal">
            <div className="input-box-modal">
              <label>CPF</label>
              <input
                maxLength="11"
                type="text"
                value={userCpf}
                onChange={(e) => {
                  formatCpf(e.target.value);
                  setErrors({ ...errors, userCpf: "", count: "" });
                }}
                onKeyDown={handleKeyDown}
              />
              {errors.userCpf && (
                <span className="error-message">{errors.userCpf}</span>
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
