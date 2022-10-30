import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "../../styles/Modal.css";
import "../../styles/Botoes.css";
import api from "../../service/api.js";
import { Spinner } from "react-bootstrap";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import cpfValidate from "../../utils/validateCPF.js";
import phoneValidate from "../../utils/validatePhone.js";
import cursosValues from "../../utils/cursos.js";

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

  const cursos = cursosValues();

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
  }

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 2000);
  }

  const [isDisabled, setIsDisabled] = useState(false);

  function validate() {
    // TODO: Verificar o bug que não notifica o usuário quando
    // o campo de outro curso está vazio e consertar o quanto antes pfv
    toast.dismiss()

    const schema = yup.object().shape({
      name: yup.string().required("Nome é obrigatório"),
      email: yup.string().email("Email inválido").required("Email é obrigatório"),
      phone: yup.string().required("Telefone é obrigatório")
        .test("phone", "Telefone inválido", phoneValidate),
      cpf: yup.string().required("CPF é obrigatório")
        .test("cpf", "CPF inválido", cpfValidate)
    });

    try {
      schema.validateSync({ name, email, phone, cpf}, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      toast.warning("Preencha os campos corretamente", toastConfig);
      setErrors(validationErrors);
      return false;
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
      <ToastContainer {...toastConfig} />
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
                  {cursos.map((curso) => (
                    <option key={curso} value={curso}>{curso}</option>))}
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
