import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api";
import { Spinner } from "react-bootstrap";

function ModalEditarAluno({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors({});
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const id = data.id;
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [course, setCourse] = useState(data.course);
  const [type, setType] = useState(data.type);
  const [cpf, setCpf] = useState(data.cpf);

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

  function formatPhone(number) {
    // Deixa o número no formato (xx) xxxxx-xxxx
    return setPhone(number.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"));
  }

  function formatCpf(number) {
    // Deixa o cpf no formato 000.000.000-00
    return setCpf(
      number.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    );
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

    // Validação do cpf
    if (!cpf) {
      errors.cpf = "Campo obrigatório";
      count++;
    } else if (!cpf.match(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)) {
      errors.cpf = "CPF inválido";
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

    // Validação do telefone
    if (!phone) {
      errors.phone = "Campo obrigatório";
      count++;
    } else if (
      !phone.match(/^\(?([1-9]{2})\) ?([9]{1})?([0-9]{4})-?([0-9]{4})$/)
    ) {
      errors.phone = "Telefone inválido";
      count++;
    }

    if (count > 0) {
      errors.count = count;
    }

    // Casso não haja erros, o objeto errors estará vazio e irá retornar true
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    } else {
      return true;
    }
  }

  async function updateUser() {
    if (validate()) {
      setIsDisabled(true);
      try {
        await api.put("/user/update-user", {
          id,
          name,
          email,
          phone,
          course,
          type,
          cpf,
        });
        setSuccess(true);
        setIsDisabled(false);
      } catch (err) {
        alert("Erro ao cadastrar o aluno!");
        console.log(err);
        setIsDisabled(false);
      } finally {
        await close();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      updateUser();
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
          <Modal.Title>Editar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </div>

              <div className="input-box-modal">
                <label>Curso</label>
                <select
                  defaultValue={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  <option value="Novotec Administração">
                    Novotec Administração
                  </option>
                  <option value="Novotec Automação Industrial">
                    Novotec Automação Industrial
                  </option>
                  <option value="Administração">Administração</option>
                  <option value="Contabilidade">Contabilidade</option>
                  <option value="Desenvolvimento de Sistemas">
                    Desenvolvimento de Sistemas
                  </option>
                  <option value="Redes de Computadores">
                    Redes de Computadores
                  </option>
                  <option value="Eletroeletrônica">Eletroeletrônica</option>
                  <option value="Logística">Logística</option>
                </select>
              </div>

              <div className="input-box-modal">
                <label>CPF</label>
                <input
                  maxLength="11"
                  type="text"
                  value={cpf}
                  onChange={(e) => {
                    formatCpf(e.target.value);
                    setErrors({ ...errors, cpf: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.cpf && <p className="error-message">{errors.cpf}</p>}
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
                <label>Celular</label>
                <input
                  maxLength="11"
                  type="text"
                  value={phone}
                  onChange={(e) => {
                    formatPhone(e.target.value);
                    setErrors({ ...errors, phone: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Tipo</label>
                <select
                  className="tipo-pesquisa"
                  defaultValue={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={"Aluno"}>Alunod</option>
                  <option value={"Funcionario"}>Funcionário</option>
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
            <p className="success-message">Aluno atualizado com sucesso!</p>
          )}
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
