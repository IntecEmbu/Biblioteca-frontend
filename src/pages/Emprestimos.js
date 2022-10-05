import React from "react";
import Navbar from "../components/Navbar.js";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CardLending from "../components/CardLending.js";
import "../styles/Botoes.css";

export default function Emprestimos() {
  const spinnner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [userCard, setUserCard] = React.useState(spinnner);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [nameSearch, setNameSearch] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("name");
  const [counter, setCounter] = React.useState("");

  function search() {
    return false;
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  return (
    <>
      <Navbar />
      <div className="pagina-container">
        <div className="titulo-container">
          <h1>Empréstimos</h1>
        </div>
        <div className="pesquisar-container">
          <input
            className="input-pesquisa"
            type="text"
            placeholder="Pesquise aqui"
            onKeyDown={handleKeyDown}
            onChange={(e) => setNameSearch(e.target.value.trim())}
          />
          <select
            className="tipo-pesquisa"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value={"name"}>Nome</option>
            <option value={"book"}>Livro</option>
            <option value={"code"}>Código</option>
          </select>
          <div className="btn-container">
            <button
              className="btn-pesquisar"
              onClick={search}
              disabled={isDisabled}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="count-container">{counter}</div>
        <div className="cards-container">
          <CardLending />
        </div>
      </div>
    </>
  );
}
