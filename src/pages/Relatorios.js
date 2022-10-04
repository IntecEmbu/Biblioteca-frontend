import React from "react";
import Navbar from "../components/Navbar.js";
import "../styles/Botoes.css";

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
      </div>
    </>
  );
}
