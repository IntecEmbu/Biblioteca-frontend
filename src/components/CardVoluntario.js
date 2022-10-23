import React, { useEffect } from "react";
import ModalExcluir from "../components/ModalExcluir.js";
import ModalEditarVoluntario from "../components/ModalEditarVoluntario.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";
import "../styles/Voluntarios.css";

function CardBook(props) {
  const [buttons, setButtons] = React.useState("");

  const { id, name, email, user } = props;
  const dataVolunter = { id, name, email, user };

  function showButtons() {
    if (
      JSON.parse(sessionStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(sessionStorage.getItem("user")).librarian_type ==
        "Bibliotecario"
    ) {
      setButtons(
        <div className="btn-card-container">
          <div className="btn-editar-container">
            <ModalEditarVoluntario data={dataVolunter} />
          </div>
          <div className="btn-excluir-container">
            <ModalExcluir path={"/librian"} id={id} />
          </div>
        </div>
      );
    }
  }

  useEffect(() => {
    showButtons();
  }, []);

  return (
    <div id="card-main-container-voluntario">
      <div className="card-main">
        <p className="titulo-card-main">{props.name}</p>
        <p className="p-card-main">E-mail: {props.email}</p>
        <p className="p-card-main">Usuário: {props.user}</p>
        {buttons}
      </div>
    </div>
  );
}

export default CardBook;
