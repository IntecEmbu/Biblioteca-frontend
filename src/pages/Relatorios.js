import React from "react";
import Navbar from "../components/Navbar.js";
import "../styles/Botoes.css";
import "../styles/Relatorios.css";
import QtdLivroChart from "../components/Charts/QtdLivroChart.js";
import QtdEmprestimoChart from "../components/Charts/QtdEmprestimoChart.js";
import ModalRelatorios from "../components/Modal/Relatorios/ModalRelatorios.js";

export default function Relatorios() {
  return (
    <>
      <Navbar />
      <div className="pagina-container">
        <div className="titulo-container">
          <h1>Relatórios</h1>
          <div className="btn-cadastrar-container">
            <ModalRelatorios />
          </div>
        </div>
        <div className="area-grafico">
          <div className="grafico-container">
            <QtdLivroChart />
          </div>
          <div className="grafico-container">
            <QtdEmprestimoChart />
          </div>
        </div>
      </div>
    </>
  );
}
