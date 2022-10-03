import React, { useEffect } from "react";
import CardAluno from "../components/CardAluno.js";
import Navbar from "../components/Navbar.js";
import ModalCadastrarAluno from "../components/ModalCadastrarAluno.js";
import { FaSearch } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import downloadUser from "../service/searchUser.js";
import "../styles/Botoes.css";

export default function Alunos() {
  const spinnner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [userCard, setUserCard] = React.useState(spinnner);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [nameSearch, setNameSearch] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("name");
  const [users, setUsers] = React.useState([]);
  const [counter, setCounter] = React.useState("");

  function formatCpf(number) {
    return number.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  async function search() {
    if (nameSearch == "") {
      return;
    }
    setUserCard(spinnner);
    setCounter("");

    setTimeout(() => {
      if (selectValue === "name") {
        var usersFind = users.filter((user) =>
          user.user_name
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "course") {
        var usersFind = users.filter((user) =>
          user.user_course
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "cpf") {
        var usersFind = users.filter((user) =>
          user.user_cpf
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      }

      if (usersFind.length === 0) {
        return setUserCard(
          <img
            id="book-notFound"
            src={require("../images/livro-nao-encontrado.png")}
            alt="Not Found"
          />
        );
      }

      const dataCard = usersFind.map((user) => {
        return (
          <CardAluno
            key={user.user_id}
            id={user.user_code}
            name={user.user_name}
            email={user.user_email}
            phone={user.user_phone}
            course={user.user_course}
            cpf={user.user_cpf}
            type={user.user_type}
          />
        );
      });

      setCounter(<p>{usersFind.length} pessoas encontradas.</p>);
      setUserCard(dataCard);
    }, 100);
  }

  async function loadUser() {
    const data = await downloadUser();
    setUsers(data);

    if (data.length == 0) {
      setUserCard(
        <img
          id="book-notFound"
          src={require("../images/livro-nao-encontrado.png")}
          alt="Not Found"
        />
      );
    }

    const cards = data.map((user) => {
      return (
        <CardAluno
          key={user.user_code}
          id={user.user_code}
          name={user.user_name}
          email={user.user_email}
          phone={user.user_phone}
          course={user.user_course}
          cpf={user.user_cpf}
          type={user.user_type}
        />
      );
    });
    setUserCard(cards);
    setIsDisabled(false);
  }

  useEffect(() => {
    loadUser();
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
          <h1>Alunos</h1>
          <div className="pesquisar-container">
            <input
              className="input-pesquisa"
              type="text"
              value={nameSearch}
              placeholder="Pesquise aqui"
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setNameSearch(formatCpf(e.target.value));
              }}
            />
            <select
              className="tipo-pesquisa"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value={"name"}>Nome</option>
              <option value={"cpf"}>CPF</option>
              <option value={"course"}>Curso</option>
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
            <div className="btn-cadastrar-container">
              <ModalCadastrarAluno />
            </div>
          </div>
        </div>
        <div className="count-container">{counter}</div>
        <div className="cards-container">{userCard}</div>
      </div>
    </>
  );
}
