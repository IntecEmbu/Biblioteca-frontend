import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api.js";
import { Spinner } from "react-bootstrap";

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

  function validate() {
    let errors = {};
    let count = 0;

    // Validação do título
    if (!title) {
      errors.title = "Campo obrigatório";
      count++;
    } else if (title.length > 100) {
      errors.title = "Título muito longo";
      count++;
    }

    // Validação do autor
    if (!author) {
      errors.author = "Campo obrigatório";
      count++;
    } else if (author.length > 100) {
      errors.author = "Autor muito longo";
      count++;
    }

    // Validação da edição
    if (!edition) {
      errors.edition = "Campo obrigatório";
      count++;
    } else if (edition.length > 100) {
      errors.edition = "Edição muito longa";
      count++;
    }

    // Validação do ano de lançamento
    var year = new Date().getFullYear();
    if (!release_year) {
      errors.release_year = "Campo obrigatório";
      count++;
    } else if (release_year < 1000 || release_year > year) {
      errors.release_year = "Ano inválido";
      count++;
    }

    // Validação da categoria
    if (!category) {
      errors.category = "Campo obrigatório";
      count++;
    }

    // Validação do idioma
    if (!language) {
      errors.language = "Campo obrigatório";
      count++;
    }

    // Validação do isbn
    if (!isbn) {
      errors.isbn = "Campo obrigatório";
      count++;
    } else if (isbn.length > 13 || isbn.length < 13) {
      errors.isbn = "ISBN inválido";
      count++;
    }

    // Validação do cdd
    if (!cdd) {
      errors.cdd = "Campo obrigatório";
      count++;
    } else if (cdd.length > 100) {
      errors.cdd = "CDD muito longo";
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
                <input
                  onChange={(e) => {
                    setRelease_year(e.target.value);
                    setErrors({ ...errors, release_year: "", count: "" });
                  }}
                  onKeyDown={handleKeyDown}
                  value={release_year}
                  type="number"
                />
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
          {errors.count && (
            <p className="error-count-message">{errors.count}</p>
          )}
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
