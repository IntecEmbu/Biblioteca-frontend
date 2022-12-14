import React, { useEffect } from "react";
import CardAluno from "../components/Cards/CardAluno.js";
import Navbar from "../components/Navbar.js";
import ModalCadastrarAluno from "../components/Modal/Aluno/ModalCadastrarAluno.js";
import { FaSearch } from "react-icons/fa";
import Spinner from "react-bootstrap/Spinner";
import api from "../service/api.js";
import "../styles/Botoes.css";
import InputMask from "react-input-mask";
import cursosValues from "../utils/cursos.js";

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

  const cursos = cursosValues();

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
            count={user.count}
          />
        );
      });

      setCounter(<p>{usersFind.length} pessoa(s) encontrada(s).</p>);
      setUserCard(dataCard);
    }, 100);
  }

  async function loadUser() {
    setCounter("");
    setIsDisabled(true);
    setUserCard(spinnner);

    const response = await api.get("/user/all");
    setUsers(response.data);

    if (response.data.length == 0) {
      setUserCard(
        <img
          id="book-notFound"
          src={require("../images/livro-nao-encontrado.png")}
          alt="Not Found"
        />
      );
    }

    const cards = response.data.map((user) => {
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
          count={user.count}
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
          <div className="pesquisar-container desktop">
            {selectValue === "cpf" && (
              <InputMask
                mask="999.999.999-99"
                placeholder="Pesquise por CPF"
                maskChar=""
                value={nameSearch} 
                onChange={(e) => setNameSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              ></InputMask>
            )}
            {selectValue === "course" && (
              <>
              <input
                type="text"
                placeholder="Pesquise por curso"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                list="cursos"
              ></input>
              <datalist id="cursos">
                {cursos.map((curso) => (
                  <option key={curso} value={curso} />
                ))}
                </datalist>
              </>
            )}
            {selectValue === "name" && (
              <input
                type="text"
                placeholder="Pesquise por nome"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
            )}
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
              <button
                className="btn-listar"
                disabled={isDisabled}
                onClick={loadUser}
              >
                Listar Todos
              </button>
            </div>
            <div className="btn-cadastrar-container">
              <ModalCadastrarAluno />
            </div>
          </div>
        </div>
        {/* Mobile */}
        <div className="pesquisar-container mobile">
          {selectValue === "cpf" ? (
              <InputMask
                mask="999.999.999-99"
                placeholder="Pesquise por CPF"
                maskChar=""
                value={nameSearch} 
                onChange={(e) => setNameSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              ></InputMask>
            ) : (
              <input
                type="text"
                placeholder="Pesquise aqui"
                value={nameSearch}
                onChange={(e) => setNameSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            )}
          <div className="btn-container">
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
