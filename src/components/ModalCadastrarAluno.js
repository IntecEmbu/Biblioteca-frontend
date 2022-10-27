import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/Modal.css";
import "../styles/Botoes.css";
import api from "../service/api.js";
import { Spinner } from "react-bootstrap";
import InputMask from "react-input-mask";

function Example() {
  const [show, setShow] = useState(false);

  function handleClose() {
    setCpf("");
    setPhone("");
    setShow(false);
    setErrors({});
  }

  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Administração");
  const [otherCourse, setOtherCourse] = useState("");
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
      !phone.match(/^\(\d{2}\)\s\d{5}\-\d{4}$/)
    ) {
      errors.phone = "Telefone inválido";
      count++;
    }

    if(course === "Outro"){
      if(!otherCourse){
        errors.otherCourse = "Campo obrigatório";
        count++;
      } else if(otherCourse.length > 100){
        errors.otherCourse = "Curso muito longo";
        count++;
      }
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

  async function sendUser() {
    if (validate()) {
      setIsDisabled(true);
      setErrors({});

      if(course === "Outro"){
        setCourse(otherCourse);
      }

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
      <button className="btn-cadastrar desktop" onClick={handleShow}>
        Cadastrar Aluno
      </button>

      <button className="btn-cadastrar mobile" onClick={handleShow}>
        Cadastrar
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
                  onChange={(e) => {
                    setCourse(e.target.value);
                    setErrors({ ...errors, otherCourse: "", count: "" });
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
                  <option value="Outro">Outro</option>
                </select>
              </div>

              
              {course === "Outro" && errors.otherCourse && (
                <div className="input-box-modal">
                  <input
                    placeholder="Digite o nome do curso"
                    type="text"
                    onChange={(e) => {
                      setOtherCourse(e.target.value);
                      setErrors({ ...errors, otherCourse: "", count: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                  <p className="error-message">{errors.otherCourse}</p>
                </div>
              )}

              {course === "Outro" && !errors.otherCourse && (
                <div className="input-box-modal">
                  <input
                    placeholder="Digite o nome do curso"
                    type="text"
                    onChange={(e) => {
                      setOtherCourse(e.target.value);
                      setErrors({ ...errors, otherCourse: "", count: "" });
                    }}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              )}

              <div className="input-box-modal">
                <label>CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  maskChar=""
                  value={cpf}
                  onChange={(e) => {
                    setCpf(e.target.value); 
                    setErrors({ ...errors, cpf: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                ></InputMask>
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
                <InputMask
                  mask="(99) 99999-9999"
                  maskChar=""
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                ></InputMask>
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
                  <option value={"Aluno"}>Aluno</option>
                  <option value={"Funcionario"}>Funcionário</option>
                </select>
              </div>
            </div>
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
