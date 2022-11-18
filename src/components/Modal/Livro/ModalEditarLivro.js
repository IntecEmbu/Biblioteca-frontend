import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../../../service/api.js";
import { Spinner } from "react-bootstrap";
import InputMask from "react-input-mask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import isbnValidate from "../../../utils/validateISBN.js";
import validateYear from "../../../utils/validateYear.js";

function ModalEditarLivro({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setErrors({});
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const id = data.id;
  const [title, setTitle] = useState(data.title);
  const [author, setAuthor] = useState(data.author);
  const [edition, setEdition] = useState(data.edition);
  const [release_year, setRelease_year] = useState(data.release_year);
  const [category, setCategory] = useState(data.category);
  const [language, setLanguage] = useState(data.language);
  const [isbn, setIsbn] = useState(data.isbn);
  const [cdd, setCdd] = useState(data.cdd);
  const [position, setPosition] = useState(data.position)
  const [tombo, setTombo] = useState(data.tombo)

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    hideProgressBar: true,
    closeButton: false,
  };

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
      language: yup.string().required("Idioma é obrigatório"),
      release_year: yup.string().required("Ano é obrigatório")
        .test(validateYear, "Ano inválido", validateYear),
      author: yup.string().required("Autor é obrigatório"),
      isbn: yup.string().required("ISBN é obrigatório")
        .test(isbn, "ISBN inválido", isbnValidate),
      cdd: yup.string().required("CDD é obrigatório"),
      position: yup.string().required("Posição é obrigatória"),
      tombo: yup.string().required("Tombo é obrigatório")
    });

    try {
      schema.validateSync(
        { title, edition, category, language, release_year, author, isbn, cdd, position, tombo }, 
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


  async function updateBook() {
    console.log(errors);
    if (validate()) {
      try {
        setIsDisabled(true);

        await api.put("/book/update-book", {
          id,
          title,
          author,
          edition,
          release_year,
          category,
          language,
          isbn,
          cdd,
          position,
          tombo
        });

        setSuccess(true);
        setIsDisabled(false);
      } catch (err) {
        alert("Erro ao atualizar livro!");
        console.log(err);
        setIsDisabled(false);
      } finally {
        await close();
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      updateBook();
    }
  }

  return (
    <>
      <ToastContainer {...toastConfig} />
      <button className="btn-editar-card desktop" onClick={handleShow}>
        <FaPen className="fa-pen" />
        Editar
      </button>

      <button className="btn-editar-card mobile" onClick={handleShow}>
        <FaPen className="fa-pen" />
      </button>

      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Título</label>
                <input
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={title}
                  type="text"
                />
                {errors.title && (
                  <p className="error-message">{errors.title}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Autor</label>
                <input
                  onChange={(e) => {
                    setAuthor(e.target.value);
                    setErrors({ ...errors, author: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={author}
                  type="text"
                />
                {errors.author && (
                  <p className="error-message">{errors.author}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Edição</label>
                <input
                  onChange={(e) => {
                    setEdition(e.target.value);
                    setErrors({ ...errors, edition: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={edition}
                  type="text"
                />
                {errors.edition && (
                  <p className="error-message">{errors.edition}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Ano de Lançamento</label>
                <InputMask
                  mask="9999"
                  maskChar=""
                  onChange={(e) => {
                    setRelease_year(e.target.value);
                    setErrors({ ...errors, release_year: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={release_year}
                ></InputMask>
                {errors.release_year && (
                  <p className="error-message">{errors.release_year}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Categoria</label>
                <input
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors({ ...errors, category: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={category}
                  type="text"
                />
                {errors.category && (
                  <p className="error-message">{errors.category}</p>
                )}
              </div>

              <div className="input-box-modal">
                <label>Idioma</label>
                <input
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setErrors({ ...errors, language: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={language}
                  type="text"
                />
                {errors.language && (
                  <p className="error-message">{errors.language}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Posição</label>
                <input
                  onChange={(e) => {
                    setPosition(e.target.value);
                    setErrors({ ...errors, position: "", count: "" });
                  }}
                  value={position}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.position && (
                  <p className="error-message">{errors.position}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>Tombo</label>
                <input
                  onChange={(e) => {
                    setTombo(e.target.value);
                    setErrors({ ...errors, tombo: "", count: "" });
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={tombo}
                />
                {errors.tombo && (
                  <p className="error-message">{errors.tombo}</p>
                )}
              </div>
              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  onChange={(e) => {
                    setIsbn(e.target.value);
                    setErrors({ ...errors, isbn: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={isbn}
                  type="text"
                />
                {errors.isbn && <p className="error-message">{errors.isbn}</p>}
              </div>

              <div className="input-box-modal">
                <label>CDD</label>
                <input
                  onChange={(e) => {
                    setCdd(e.target.value);
                    setErrors({ ...errors, cdd: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={cdd}
                  type="text"
                />
                {errors.cdd && <p className="error-message">{errors.cdd}</p>}
              </div>
            </div>
          </form>
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
          )}
          {success && (
            <p className="success-message">Livro atualizado com sucesso!</p>
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
            onClick={updateBook}
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

export default ModalEditarLivro;
