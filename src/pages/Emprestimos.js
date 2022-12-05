import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CardLending from "../components/Cards/CardLending.js";
import "../styles/Botoes.css";
import api from "../service/api.js";

export default function Emprestimos() {
  const spinner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [isDisabled, setIsDisabled] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [selectValue, setSelectValue] = useState("name");
  const [cards, setCards] = useState(spinner);
  const [lendings, setLendings] = useState([]);
  const [counter, setCounter] = useState("");

  function search() {
    if (nameSearch === "") {
      return;
    }

    setCards(spinner);
    setCounter("");

    setTimeout(() => {
      if (selectValue === "name") {
        var lendingsFind = lendings.filter((lending) =>
          lending.user_name
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "book") {
        var lendingsFind = lendings.filter((lending) =>
          lending.book_name
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "code") {
        var lendingsFind = lendings.filter((lending) =>
          lending.lending_code.toString().includes(nameSearch.toString())
        );
      }

      if (lendingsFind.length === 0) {
        setCards();
      } else {
        setCards(
          lendingsFind.map((lending) => (
            <CardLending
              key={lending.lending_id}
              lending_id={lending.lending_code}
              book_name={lending.book_name}
              librarian_name={lending.librarian_name}
              return_prediction={lending.return_prediction}
              user_course={lending.user_course}
              user_name={lending.user_name}
              user_email={lending.user_email}
              user_phone={lending.user_phone}
              withdraw_date={lending.withdraw_date}
              penalty={lending.penalty}
              days_delay={lending.days_delay}
            />
          ))
        );
      }

      setCounter(<p>{lendingsFind.length} emprestimo(s) encontrado(s).</p>);
    }, 100);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  async function loadLendings() {
    setCounter("");
    setIsDisabled(true);
    setCards(spinner);

    const response = await api.get("/lending/not-returned")

    if (!response.data.length) {
      setCards(
        <div className="area-loading">
          <p>Nenhum empréstimo pendente</p>
        </div>
      );
      return;
    }

    setLendings(response.data);

    setCards(
      response.data.map((lending) => (
        <CardLending
          key={lending.lending_id}
          lending_id={lending.lending_code}
          book_name={lending.book_name}
          librarian_name={lending.librarian_name}
          return_prediction={lending.return_prediction}
          user_course={lending.user_course}
          user_name={lending.user_name}
          user_email={lending.user_email}
          user_phone={lending.user_phone}
          withdraw_date={lending.withdraw_date}
          penalty={lending.penalty}
          days_delay={lending.days_delay}
        />
      ))
    );
    setIsDisabled(false);
  }

  useEffect(() => {
    loadLendings();
  }, []);

  return (
    <>
      <Navbar />
      <div className="pagina-container">
        <div className="titulo-container">
          <h1>Empréstimos</h1>
          <div className="pesquisar-container desktop">
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
                disabled={isDisabled}
                onClick={ search}
              >
                <FaSearch />
              </button>
              <button
                className="btn-listar"
                disabled={isDisabled}
                onClick={loadLendings}
              >
                Listar todos
              </button>
            </div>
          </div>
        </div>
        {/* mobile */}
        <div className="pesquisar-container mobile">
          <input
            className="input-pesquisa"
            type="text"
            placeholder="Pesquise aqui"
            onKeyDown={handleKeyDown}
            onChange={(e) => setNameSearch(e.target.value.trim())}
          />
          <div className="inputs-container-mobile">
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
        </div>
        <div className="count-container">{counter}</div>
        <div className="cards-container">{cards}</div>
      </div>
    </>
  );
}
