import React, { useEffect } from "react";
import ModalExcluir from "../Modal/ModalExcluir.js";
import ModalEditarLivro from "../Modal/Livro/ModalEditarLivro.js";
import ModalEmprestar from "../Modal/Livro/ModalEmprestar.js";
import ModalDetalhes from "../Modal/Livro/ModalDetalhes.js";
import "../../styles/Cards.css";
import "../../styles/Botoes.css";

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
    position,
    tombo
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
    position,
    tombo
  };

  function showButtons() {
    if (
      JSON.parse(sessionStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(sessionStorage.getItem("user")).librarian_type ==
        "Bibliotecario"
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
        {props.qtdStopped > 0 ? (
          <p className="p-card-main-ativo">
            {`${props.qtdStopped} `}
            {props.qtdStopped > 1 ? "exemplares" : "exemplar"}
            {props.qtdStopped > 1 ? " disponíveis" : " disponível"}
          </p>
        ) : (
          <p className="p-card-main-inativo">Indisponível</p>
        )}
        <p className="info-card-main">Autor: {props.author}</p>
        <p className="info-card-main">Edição: {props.edition}</p>
        <p className="info-card-main">Ano: {props.release_year}</p>
        <p className="info-card-main">Categoria: {props.category}</p>
        <p className="info-card-main">Idioma: {props.language}</p>
        <p className="info-card-main">Tombo: {props.tombo}</p>
        <p className="info-card-main">Posição: {props.position}</p>
        <p className="info-card-main">ISBN: {props.isbn}</p>
        <p className="info-card-main">CDD: {props.cdd}</p>
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalDetalhes
              total={props.qtdTotal}
              stopped={props.qtdStopped}
              circulation={props.qtdCirculation}
              id={props.id}
            />
          </div>
          <div className="btn-editar-container">
            <ModalEmprestar book_id={dataBook.id} />
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
