import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Spinner } from "react-bootstrap";
import api from "../service/api.js";

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
  const [isAlert, setIsAlert] = useState("");

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
    }

    // Validação da edição
    if (!edition) {
      errors.edition = "Campo obrigatório";
      count++;
    }

    // Validação da categoria
    if (!category) {
      errors.category = "Campo obrigatório";
      count++;
    }

    // Validação do idioma
    if (!idiom) {
      errors.idiom = "Campo obrigatório";
      count++;
    }

    // Validação do ano
    const currentYear = new Date().getFullYear();
    if (!year) {
      errors.year = "Campo obrigatório";
      count++;
    } else if (year.length > 4 || year.length < 4) {
      errors.year = "Ano inválido";
      count++;
    } else if (year < 1000 || year > currentYear) {
      errors.year = "Ano inválido";
      count++;
    }

    // Validação do autor
    if (!author) {
      errors.author = "Campo obrigatório";
      count++;
    }

    // Validação do isbn
    if (!isbn) {
      errors.isbn = "Campo obrigatório";
      count++;
    }

    // Validação do cdd
    if (!cdd) {
      errors.cdd = "Campo obrigatório";
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

  async function sendBook() {
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
      sendBook();
    }
  }

  return (
    <>
      <button className="btn-cadastrar" onClick={handleShow}>
        Cadastrar Livro
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
                    setErrors({ ...errors, title: "", count: "" });
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
                <input
                  onChange={(e) => {
                    setYear(e.target.value);
                    setErrors({ ...errors, year: "", count: "" });
                  }}
                  type="number"
                  onKeyDown={handleKeyDown}
                />
                {errors.year && <p className="error-message">{errors.year}</p>}
              </div>
              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  onChange={(e) => {
                    setIsbn(e.target.value);
                    setErrors({ ...errors, isbn: "", count: "" });
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
                  }}
                  type="text"
                  onKeyDown={handleKeyDown}
                />
                {errors.cdd && <p className="error-message">{errors.cdd}</p>}
              </div>
            </div>
          </form>
          {errors.count && <p className="error-message">{errors.count}</p>}
          {success && (
            <p className="success-message">Livro cadastrado com sucesso!</p>
          )}
          {isDisabled && (
            <div className="loading-modal">
              <Spinner animation="border" />
            </div>
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
