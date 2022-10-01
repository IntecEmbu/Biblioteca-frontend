import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { FaPen } from "react-icons/fa";
import api from "../service/api.js";
import { Spinner } from "react-bootstrap";

function ModalEditarLivro({ data }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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

  const [spinner, setSpinner] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  async function updateBook() {
    try {
      setSpinner(<Spinner id="loading" animation="border" />);
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

      alert("Livro atualizado com sucesso!");
    } catch (err) {
      alert("Erro ao atualizar livro!");
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
          <Modal.Title>Editar Livro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="input-group-modal">
              <div className="input-box-modal">
                <label>Título</label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Autor</label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  value={author}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Edição</label>
                <input
                  onChange={(e) => setEdition(e.target.value)}
                  value={edition}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Ano de Lançamento</label>
                <input
                  onChange={(e) => setRelease_year(e.target.value)}
                  value={release_year}
                  type="number"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Categoria</label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>Idioma</label>
                <input
                  onChange={(e) => setLanguage(e.target.value)}
                  value={language}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  onChange={(e) => setIsbn(e.target.value)}
                  value={isbn}
                  type="text"
                  required
                />
              </div>

              <div className="input-box-modal">
                <label>CDD</label>
                <input
                  onChange={(e) => setCdd(e.target.value)}
                  value={cdd}
                  type="text"
                  required
                />
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
