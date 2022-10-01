import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api";
import Spinner from "react-bootstrap/Spinner";

function ModalEditarAluno({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const id = data.id;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [course, setCourse] = useState(data.course);
  const [type, setType] = useState(data.type);

  const [spinner, setSpinner] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function updateUser() {
    setSpinner(<Spinner id="loading" animation="border" />);
    setIsDisabled(true);

    try {
      await api.put("/user/update-user", {
        id,
        name,
        email,
        phone,
        course,
        type,
      });
      alert("Aluno atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar aluno!");
      console.log(err);
    }

    setSpinner("");
    setIsDisabled(false);

    handleClose();
    window.location.reload();
  }

  return (
    <>
      <button className="btn-editar-card" onClick={handleShow}>
        <FaPen className="fa-pen" />
        Editar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Editar Aluno</Modal.Title>
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
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Curso</label>
                <input
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>CPF</label>
                <input type="text" required />
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Celular</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Tipo</label>
                <select
                  className="tipo-pesquisa"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={"Aluno"}>ALUNO</option>
                  <option value={"Funcionario"}>FUNCIONÁRIO</option>
                </select>
              </div>
            </div>
          </form>
        </Modal.Body>
        <div className="spinner-login">{spinner}</div>
        <Modal.Footer>
          <button
            className="btn-cancelar-modal"
            onClick={handleClose}
            disabled={isDisabled}
          >
            Cancelar
          </button>
          <button
            className="btn-editar-modal"
            onClick={updateUser}
            disabled={isDisabled}
          >
            <FaPen className="fa-pen" />
            Editar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEditarAluno;
