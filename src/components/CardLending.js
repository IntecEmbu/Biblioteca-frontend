import React, { useEffect } from "react";
import ModalDevolver from "../components/ModalDevolver.js";
import "../styles/Cards.css";
import "../styles/Botoes.css";

function CardBook(props) {
  return (
    <div id="card-main-container">
      <div className="card-main">
        <p className="titulo-card-main">{props.user_name}</p>
        <p className="info-card-main">Livro: {props.book_name}</p>
        <p className="info-card-main">
          Código do empréstimo: {props.lending_id}
        </p>
        <p className="info-card-main">Emprestado em: {props.withdraw_date}</p>
        <p className="info-card-main">Previsão: {props.return_prediction}</p>
        <p className="info-card-main">Emprestado por: {props.librarian_name}</p>
        <div className="btn-card-container">
          <div className="btn-excluir-container">
            <ModalDevolver lending_id={props.lending_id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardBook;
