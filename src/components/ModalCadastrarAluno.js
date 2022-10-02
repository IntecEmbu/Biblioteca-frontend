import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/Modal.css";
import "../styles/Botoes.css";
import api from "../service/api.js";
import { Spinner } from "react-bootstrap";

function Example() {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
    setErrors({});
  }

  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Administração");
  const [type, setType] = useState("Aluno");
  const [cpf, setCpf] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  const [isDisabled, setIsDisabled] = useState(false);

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
    } else if (cpf.length > 11 || cpf.length < 11) {
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

  async function sendUser() {
    if (validate()) {
      setIsDisabled(true);
      setErrors({});

      const data = {
        name,
        email,
        phone,
        course,
        type,
        cpf,
      };

      try {
        setIsDisabled(true);
        await api.post("/user/insert", data);
        setSuccess(true);
        setIsDisabled(false);
      } catch (error) {
        alert("Erro ao cadastrar o aluno!");
        console.log(error);
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
      sendUser();
    }
  }

  return (
    <>
      <button className="btn-cadastrar" onClick={handleShow}>
        Cadastrar Aluno
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Cadastrar Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Nome</label>
                <input
                  type="text"
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
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
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
                  type="text"
                  onChange={(e) => {
                    setCpf(e.target.value);
                    setErrors({ ...errors, cpf: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                />
                {errors.cpf && <p className="error-message">{errors.cpf}</p>}
              </div>

              <div className="input-box-modal">
                <label>E-mail</label>
                <input
                  type="text"
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
                <label>Celular</label>
                <input
                  type="text"
                  onChange={(e) => {
                    setPhone(e.target.value);
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
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value={"Aluno"}>ALUNO</option>
                  <option value={"Funcionario"}>FUNCIONÁRIO</option>
                </select>
              </div>
            </div>
            {errors.count && (
              <p className="error-count-message">{errors.count}</p>
            )}
            {isDisabled && (
              <div className="loading-modal">
                <Spinner animation="border" />
              </div>
            )}
            {success && (
              <p className="success-message">Aluno cadastrado com sucesso!</p>
            )}
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-cancelar-modal" onClick={handleClose}>
            Cancelar
          </button>
          <button
            className="btn-cadastrar-modal"
            onClick={sendUser}
            disabled={isDisabled}
            type="submit"
          >
            Cadastrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
