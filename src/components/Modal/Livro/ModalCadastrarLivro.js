import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";
import api from "../../../service/api.js";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import isbnValidate from "../../../utils/validateISBN.js";
import validateYear from "../../../utils/validateYear.js";

function Example() {
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(false);
    setErrors({});
  }
  const handleShow = () => setShow(true);

  const [title, setTitle] = useState("");
  const [edition, setEdition] = useState("");
  const [category, setCategory] = useState("");
  const [idiom, setIdiom] = useState("");
  const [year, setYear] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [cdd, setCdd] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);

  const [apiError, setApiError] = useState("");
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

  function validate() {
    toast.dismiss()

    const schema = yup.object().shape({
      title: yup.string().required("Título é obrigatório"),
      edition: yup.string().required("Edição é obrigatória"),
      category: yup.string().required("Categoria é obrigatória"),
      idiom: yup.string().required("Idioma é obrigatório"),
      year: yup.string().required("Ano é obrigatório")
        .test("year", "Ano inválido", validateYear),
      author: yup.string().required("Autor é obrigatório"),
      isbn: yup.string().required("ISBN é obrigatório")
        .test(isbn, "ISBN inválido", isbnValidate),
      cdd: yup.string().required("CDD é obrigatório"),
    });

    try {
      schema.validateSync(
        { title, edition, category, idiom, year, author, isbn, cdd }, 
        { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      toast.warning("Preencha os campos corretamente");
      setErrors(validationErrors);
      return false;
    }
  }

  async function sendBook() {
    setApiError("");
    if (validate()) {
      setIsDisabled(true);

      const data = {
        title,
        edition,
        isbn,
        cdd,
        year,
        category,
        idiom,
        author,
      };

      try {
        await api.post("/book/insert", data);
        setSuccess(true);
        setIsDisabled(false);
        await close();
      } catch (error) {
        if(error.response.status === 401){
          setApiError("Livro já cadastrado")
        }
        
        // console.log(error);
        setIsDisabled(false);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      sendBook();
    }
  }

  return (
    <>
      <ToastContainer {...toastConfig} />
      <button className="btn-cadastrar desktop" onClick={handleShow}>
        Cadastrar Livro
      </button>

      <button className="btn-cadastrar mobile" onClick={handleShow}>
        Cadastrar
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Cadastrar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Título</label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: "", count: ""});
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.title && (
                  <p className="error-message">{errors.title}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Edição</label>
                <input
                  onChange={(e) => {
                    setEdition(e.target.value);
                    setErrors({ ...errors, edition: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.edition && (
                  <p className="error-message">{errors.edition}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Categoria</label>
                <input
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors({ ...errors, category: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.category && (
                  <p className="error-message">{errors.category}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Idioma</label>
                <input
                  onChange={(e) => {
                    setIdiom(e.target.value);
                    setErrors({ ...errors, idiom: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.idiom && (
                  <p className="error-message">{errors.idiom}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Autor</label>
                <input
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setErrors({ ...errors, author: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.author && (
                  <p className="error-message">{errors.author}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Ano de Lançamento</label>
                <InputMask 
                  mask="9999"
                  maskChar="" 
                  onChange={(e) => {
                    setYear(e.target.value);
                    setErrors({ ...errors, year: "", count: "" });
                    setApiError("");
                  }}
                  onKeyDown={handleKeyDown}
                ></InputMask>
                {errors.year && <p className="error-message">{errors.year}</p>}
              </div>
              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  onChange={(e) => {
                    setIsbn(e.target.value);
                    setErrors({ ...errors, isbn: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.isbn && <p className="error-message">{errors.isbn}</p>}
              </div>
              <div className="input-box-modal">
                <label>CDD</label>
                <input
                  onChange={(e) => {
                    setCdd(e.target.value);
                    setErrors({ ...errors, cdd: "", count: "" });
                    setApiError("");
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.cdd && <p className="error-message">{errors.cdd}</p>}
              </div>
            </div>
          </form>
          {success && (
            <p className="success-message">Livro cadastrado com sucesso!</p>
          )}
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
          {apiError && (
            <p className="error-message">{apiError}</p>
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
            className="btn-cadastrar-modal"
            onClick={sendBook}
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
