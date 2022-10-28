import React, { useEffect } from "react";
import CardVoluntario from "../components/CardVoluntario.js";
import Navbar from "../components/Navbar.js";
import ModalCadastrarVoluntario from "../components/ModalCadastrarVoluntario.js";
import { FaSearch } from "react-icons/fa";
import downloadLibrarian from "../service/searchLibrarian.js";
import Spinner from "react-bootstrap/Spinner";
import "../styles/Botoes.css";

export default function Voluntarios() {
  const spinnner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [button, setButton] = React.useState(<></>);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [volunteers, setVolunteers] = React.useState([]);
  const [nameSearch, setNameSearch] = React.useState("");
  const [volunteersCard, setVolunteersCard] = React.useState(spinnner);
  const [counter, setCounter] = React.useState("");

  async function search() {
    if (nameSearch == "") {
      return;
    }

    setVolunteersCard(spinnner);

    setTimeout(() => {
      var volunteersFind = volunteers.filter((volunteer) =>
        volunteer.librarian_name
          .toLocaleLowerCase()
          .includes(nameSearch.toLocaleLowerCase())
      );

      if (volunteersFind.length === 0) {
        return setVolunteersCard(
          <img
            id="book-notFound"
            src={require("../images/livro-nao-encontrado.png")}
            alt="Not Found"
          />
        );
      }

      const dataCard = volunteersFind.map((volunteer) => {
        return (
          <CardVoluntario
            key={volunteer.librarian_code}
            id={volunteer.librarian_code}
            name={volunteer.librarian_name}
            email={volunteer.librarian_email}
            user={volunteer.librarian_user}
            type={volunteer.librarian_type}
            status={volunteer.librarian_status}
          />
        );
      });
      setVolunteersCard(dataCard);
      setCounter(<p>{volunteersFind.length} voluntário(s) encontrado(s).</p>);
    }, 100);
  }

  async function loadVolunteers() {
    setCounter("");
    setIsDisabled(true);
    setVolunteersCard(spinnner);

    const volunteers = await downloadLibrarian();
    setVolunteers(volunteers);

    console.log(volunteers);

    if (!volunteers) {
      return setVolunteersCard("");
    }

    const dataCard = volunteers.map((volunteer) => {
      return (
        <CardVoluntario
          key={volunteer.librarian_code}
          id={volunteer.librarian_code}
          name={volunteer.librarian_name}
          email={volunteer.librarian_email}
          user={volunteer.librarian_user}
          type={volunteer.librarian_type}
          status={volunteer.librarian_status}
        />
      );
    });

    setVolunteersCard(dataCard);
    setIsDisabled(false);
  }

  function verifyUser() {
    if (
      JSON.parse(sessionStorage.getItem("user")).librarian_type == "ADM" ||
      JSON.parse(sessionStorage.getItem("user")).librarian_type ==
        "Bibliotecario"
    ) {
      setButton(<ModalCadastrarVoluntario />);
    }
  }

  useEffect(() => {
    loadVolunteers();
    verifyUser();
  }, []);

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
          <h1>Voluntários</h1>
          <div className="pesquisar-container desktop">
            <input
              className="input-pesquisa"
              type="text"
              placeholder="Pesquise aqui"
              onKeyDown={handleKeyDown}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <div className="btn-container">
              <button
                className="btn-pesquisar"
                onClick={search}
                disabled={isDisabled}
              >
                <FaSearch />
              </button>
              <button
                className="btn-listar"
                onClick={loadVolunteers}
                disabled={isDisabled}
              >
                Listar todos
              </button>
            </div>
            <div className="btn-cadastrar-voluntario-container">{button}</div>
          </div>
        </div>
        {/* Mobile */}
        <div className="pesquisar-container mobile">
          <input
            className="input-pesquisa"
            type="text"
            placeholder="Pesquise aqui"
            onKeyDown={handleKeyDown}
            onChange={(e) => setNameSearch(e.target.value)}
          />
          <div className="inputs-container-mobile">
            <div className="btn-cadastrar-voluntario-container">{button}</div>
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
        <div className="counter-container">{counter}</div>
        <div className="cards-container">{volunteersCard}</div>
      </div>
    </>
  );
}
