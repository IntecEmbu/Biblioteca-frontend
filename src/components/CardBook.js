import React, { useEffect } from "react";
import ModalExcluir from "../components/ModalExcluir.js";
import ModalEditarLivro from "../components/ModalEditarLivro.js";
import ModalEmprestar from "../components/ModalEmprestar.js";
import ModalDetalhes from "../components/ModalDetalhes.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";

function CardBook(props) {
  const [buttons, setButtons] = React.useState("");

  const {
    id,
    title,
    author,
    edition,
    release_year,
    category,
    language,
    isbn,
    cdd,
  } = props;

  const dataBook = {
    id,
    title,
    author,
    edition,
    release_year,
    category,
    language,
    isbn,
    cdd,
  };

  function showButtons() {
    if (
      JSON.parse(localStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(localStorage.getItem("user")).librarian_type == "Bibliotecario"
    ) {
      setButtons(
        <div className="btn-excluir-container">
          <ModalExcluir path={"/book"} id={id} />
        </div>
      );
    }
  }

  useEffect(() => {
    showButtons();
  }, []);

  return (
    <div id="card-main-container">
      <div className="card-main">
        <p className="titulo-card-main">{props.title}</p>
        <p className="info-card-main">Autor: {props.author}</p>
        <p className="info-card-main">Edição: {props.edition}</p>
        <p className="info-card-main">Ano: {props.release_year}</p>
        <p className="info-card-main">Categoria: {props.category}</p>
        <p className="info-card-main">Idioma: {props.language}</p>
        <p className="info-card-main">ISBN: {props.isbn}</p>
        <p className="info-card-main">CDD: {props.cdd}</p>
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalDetalhes
              total={props.qtdTotal}
              stopped={props.qtdStopped}
              circulation={props.qtdCirculation}
            />
          </div>
          <div className="btn-editar-container">
            <ModalEmprestar data={dataBook} />
          </div>
          <div className="btn-editar-container">
            <ModalEditarLivro data={dataBook} />
          </div>
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default CardBook;
