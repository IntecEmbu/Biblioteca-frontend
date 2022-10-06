import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";
import api from "../service/api";
import "../styles/Modal.css";

function ModalDevolver({ lending_id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [isDisabled, setIsDisabled] = useState(false);
  const [sucess, setSucess] = useState(false);
  const [errors, setErrors] = useState(false);

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 1000);
  }

  async function devolver() {
    setIsDisabled(true);
    setErrors(false);

    try {
      await api.post("/lending/return-book", { lending_id });
      setSucess(true);
      await close();
    } catch (err) {
      setErrors(true);
      console.log(err);
    }

    setIsDisabled(false);
  }

  return (
    <>
      <button className="btn-devolver-card" onClick={handleShow}>
        Devolver
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Devolver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja devolver?
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
          {sucess && <p className="success-message">Devolvido com sucesso</p>}
          {errors && <p className="error-message">Erro ao devolver</p>}
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
            className="btn-devolver-modal"
            onClick={devolver}
            disabled={isDisabled}
          >
            Devolver
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDevolver;
