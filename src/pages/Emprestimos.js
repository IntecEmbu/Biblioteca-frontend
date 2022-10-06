import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.js";
import { FaSearch } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import CardLending from "../components/CardLending.js";
import downloadLending from "../service/searchLendings.js";
import "../styles/Botoes.css";

export default function Emprestimos() {
  const spinner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [isDisabled, setIsDisabled] = useState(true);
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
              user_name={lending.user_name}
              book_name={lending.book_name}
              lending_id={lending.lending_id}
              withdraw_date={lending.withdraw_date}
              return_prediction={lending.return_prediction}
              librarian_name={lending.librarian_name}
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
    const data = await downloadLending();

    if (!data.length) {
      setCards(
        <div className="area-loading">
          <h3>Nenhum empréstimo pendente!</h3>
        </div>
      );
      return;
    }

    setLendings(data);

    setCards(
      data.map((lending) => (
        <CardLending
          key={lending.lending_id}
          lending_id={lending.lending_code}
          book_name={lending.book_name}
          librarian_name={lending.librarian_name}
          return_prediction={lending.return_prediction}
          user_course={lending.user_course}
          user_name={lending.user_name}
          withdraw_date={lending.withdraw_date}
        />
      ))
    );
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
        </div>
        <div className="count-container">{counter}</div>
        <div className="cards-container">{cards}</div>
      </div>
    </>
  );
}
