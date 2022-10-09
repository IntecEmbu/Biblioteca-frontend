import React from "react";
import Navbar from "../components/Navbar.js";
import "../styles/Botoes.css";
import "../styles/Relatorios.css";
import QtdLivrChart from "../components/QtdLivroChart.js";
import QtdEmprestimos from "../components/QtdEmprestimosChart.js";
import QtdDevolucoes from "../components/QtdDevolucoesChart.js";

export default function Relatorios() {
  return (
    <>
      <Navbar />
      <div className="pagina-container">
        <div className="titulo-container">
          <h1>Relatórios</h1>
          <div className="btn-cadastrar-container">
            <button className="btn-baixar">Baixar Relatório</button>
          </div>
        </div>
        <div className="area-grafico">
          <div className="grafico-container">
            <QtdLivrChart />
          </div>
          <div className="grafico-container">
            <QtdEmprestimos />
          </div>
          <div className="grafico-container">
            <QtdDevolucoes />
          </div>
        </div>
      </div>
    </>
  );
}
