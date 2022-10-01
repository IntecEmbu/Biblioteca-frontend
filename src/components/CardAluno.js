import React, { useEffect } from "react";
import ModalExcluir from "../components/ModalExcluir.js";
import ModalEditarAluno from "../components/ModalEditarAluno.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";

function CardBook(props) {
  const [buttons, setButtons] = React.useState("");

  const { id, name, email, phone, course, type } = props;
  const dataUser = { id, name, email, phone, course, type };

  function showButtons() {
    if (
      JSON.parse(localStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(localStorage.getItem("user")).librarian_type == "Bibliotecario"
    ) {
      setButtons(
        <div className="btn-excluir-container">
          <ModalExcluir path={"/user"} id={id} />
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
        <p className="titulo-card-main">{props.name}</p>
        <p className="info-card-main">Curso: {props.course}</p>
        <p className="info-card-main">E-mail: {props.email}</p>
        <p className="info-card-main">Celular: {props.phone}</p>
        <p className="info-card-main">Tipo: {props.type}</p>
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalEditarAluno data={dataUser} />
          </div>
          {buttons}
        </div>
      </div>
    </div>
  );
}

export default CardBook;
