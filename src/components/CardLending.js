import React, { useEffect } from "react";
import ModalDevolver from "../components/ModalDevolver.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";

function CardBook(props) {
  return (
    <div id="card-main-container">
      <div className="card-main">
        <p className="titulo-card-main">Pedro Pereira da Fonseca</p>
        <p className="info-card-main">Livro: Os 3 Porquinhos</p>
        <p className="info-card-main">Código do empréstimo: 1</p>
        <p className="info-card-main">Emprestado em: 29/09/2022</p>
        <p className="info-card-main">Previsão: 10/03/2023</p>
        <p className="info-card-main">Emprestado por: Natan Borges</p>
        <div className="btn-card-container">
          <div className="btn-excluir-container">
            <ModalDevolver />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBook;
