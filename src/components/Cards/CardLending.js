import React, { useEffect } from "react";
import ModalDevolver from "../Modal/Livro/ModalDevolver.js";
import "../../styles/Cards.css";
import "../../styles/Botoes.css";

function CardBook(props) {

  const [overdueDays, setOverdueDays] = React.useState(0);
  const [penalty, setPenalty] = React.useState(0);

  // useEffect(() => {
  //   if (props.withdraw_date) {
  //     const today = new Date();
  //     const withdrawDate = new Date(props.withdraw_date);
  //     const diffTime = Math.abs(today - withdrawDate);
  //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //     setOverdueDays(diffDays - 7);
  //     setPenalty((diffDays - 7) * 0.5);
  //   }
  // }, []); 

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
        <p className="info-card-main">Dias de atraso: {overdueDays}</p>
        <p className="info-card-main">Emprestado por: {props.librarian_name}</p>
        <p className="info-card-main">Multa: R$ {penalty}</p>
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
