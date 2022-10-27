import React, { useEffect } from "react";
import ModalExcluir from "../components/ModalExcluir.js";
import ModalEditarVoluntario from "../components/ModalEditarVoluntario.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";

function CardBook(props) {
  const [buttons, setButtons] = React.useState("");

  const { id, name, email, user, type, status } = props;
  const dataVolunter = { id, name, email, user, type, status };

  function showButtons() {
    if (
      JSON.parse(sessionStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(sessionStorage.getItem("user")).librarian_type == "Bibliotecario"
    ) {
      setButtons(
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalEditarVoluntario data={dataVolunter} />
          </div>
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
        <p className="p-card-main">E-mail: {props.email}</p>
        <p className="p-card-main">Usuário: {props.user}</p>
        <p className="p-card-main">Tipo: {props.type}</p>
        {props.status == "Ativo" ? (
          <p className="p-card-main-ativo">Status: {props.status}</p>
        ) : (
          <p className="p-card-main-inativo">Status: {props.status}</p>
        )}
        {buttons}
      </div>
    </div>
  );
}

export default CardBook;
