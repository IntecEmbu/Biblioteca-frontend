import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Alert, Spinner } from "react-bootstrap";
import api from "../service/api.js";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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

  const alertSucesso = (
    <Alert variant={"success"}>Cadastrado com sucesso!</Alert>
  );

  const alertErro = <Alert variant={"danger"}>Erro ao cadastrar!</Alert>;

  async function close() {
    setInterval(() => {
      setIsDisabled(false);
      handleClose();
      window.location.reload();
    }, 1000);
  }

  async function sendBook() {
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

    if (
      title === "" ||
      edition === "" ||
      category === "" ||
      idiom === "" ||
      year === "" ||
      author === "" ||
      isbn === "" ||
      cdd === ""
    ) {
      return alert("Preencha todos os campos!");
    }

    const confirm = window.confirm("Deseja cadastrar o livro?");
    if (confirm) {
      try {
        setIsDisabled(true);

        const response = await api.post("/book/insert", data);
        if (response.status === 200) {
          setIsAlert(alertSucesso);
          await close();
        }
      } catch (error) {
        setIsAlert(alertErro);
        console.log(error);
        await close();
        setIsDisabled(false);
      }
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
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>Edição</label>
                <input
                  onChange={(e) => setEdition(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>Categoria</label>
                <input
                  onChange={(e) => setCategory(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>Idioma</label>
                <input
                  onChange={(e) => setIdiom(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>Autor</label>
                <input
                  onChange={(e) => setAuthor(e.target.value)}
                  type="text"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>Ano de Lançamento</label>
                <input
                  onChange={(e) => setYear(e.target.value)}
                  type="number"
                  maxLength="4"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>ISBN</label>
                <input
                  onChange={(e) => setIsbn(e.target.value)}
                  type="text"
                  maxLength="17"
                  required
                />
              </div>
              <div className="input-box-modal">
                <label>CDD</label>
                <input
                  onChange={(e) => setCdd(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        {isAlert}
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
