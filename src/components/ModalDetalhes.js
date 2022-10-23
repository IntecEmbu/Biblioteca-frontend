import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaEllipsisH } from "react-icons/fa"
import Spinner from 'react-bootstrap/Spinner';
import api from "../service/api.js";

function Example(props) {
  const [show, setShow] = useState(false);

  const [total, setTotal] = useState(props.total);
  const [stopped, setStopped] = useState(props.stopped);
  const [circulation, setCirculation] = useState(props.circulation);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function close() {
    setInterval(() => {
      setDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  async function updateQuantity(){
    if(
      total < 0 ||
      total < circulation
      ){
      setError(true);
      setErrorMessage("Quantidade inválida");
      return;
    }

    try{
      setDisabled(true);
      await api.put("/book/update-quantity", {
        "id": props.id,
        "qtd_total": total,
        "qtd_stopped": stopped
      });

      setSuccess(true);
    } catch (err) {
      setError(true);
      setErrorMessage("Erro ao atualizar quantidade");
    } finally {
      setDisabled(false);
      await close();
    }
  }

  function calculateQuantity(total){
    setError(false);
    setTotal(total);
    setStopped(total - circulation);
  }

  function keyDown(e){
    if(e.key === "Enter"){
      updateQuantity();
    }
  }

  return (
    <>
      <button className="btn-editar-card" onClick={handleShow}>
        <FaEllipsisH />
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Detalhes do Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Qtd. Total</label>
                <input
                  value={total}
                  onChange={e => calculateQuantity(e.target.value)}
                  onKeyDown={keyDown}
                  type="number"
                  min={1}
                />
              </div>

              <div className="input-box-modal">
                <label>Qtd. Parado</label>
                <input
                  value={stopped}
                  readOnly
                />
              </div>

              <div className="input-box-modal">
                <label>Qtd. Circulção</label>
                <input
                  value={circulation}
                  readOnly
                />
              </div>
            </div>
          </form>
          {error && <p className="error-count-message">{errorMessage}</p>}
          {success && <p className="success-message">Quantidade atualizada com sucesso</p>}
          {disabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn-cancelar-modal"
            onClick={handleClose}
          >
            Voltar
          </button>
          <button className="btn-cancelar-modal"
            onClick={updateQuantity}
            disabled={disabled}
          >
            Salvar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example