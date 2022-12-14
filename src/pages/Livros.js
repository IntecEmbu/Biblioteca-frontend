import React, { useEffect } from "react";
import CardBook from "../components/Cards/CardBook.js";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "../components/Navbar.js";
import ModalCadastrarLivro from "../components/Modal/Livro/ModalCadastrarLivro.js";
import { FaSearch } from "react-icons/fa";
import api from "../service/api";
import "../styles/Livros.css";

function LivrosPage() {
  // Efeito de carregamento da página.
  const spinner = (
    <div className="area-loading">
      <Spinner id="loading" animation="border" />
    </div>
  );

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [booksCard, setBooksCard] = React.useState(spinner);
  const [nameSearch, setNameSearch] = React.useState("");
  const [selectValue, setSelectValue] = React.useState("title");
  const [books, setBooks] = React.useState([]);
  const [counter, setCounter] = React.useState("");
  const [dataInput, setDataInput] = React.useState("");

  async function search() {
    // Verifica se o nome foi preenchido.

    if (nameSearch === "") {
      return;
    }

    setBooksCard(spinner);
    setCounter("");

    // Colocando delay para experiencia do usuário.
    setTimeout(() => {
      // Faz a pesquisa no Hook.
      if (selectValue === "title") {
        var booksFind = books.filter((book) =>
          book.book_name
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "category") {
        var booksFind = books.filter((book) =>
          book.category_name
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      } else if (selectValue === "author") {
        var booksFind = books.filter((book) =>
          book.book_author
            .toLocaleLowerCase()
            .includes(nameSearch.toLocaleLowerCase())
        );
      }

      // Caso não encontre nenhum livro, exibe uma mensagem.
      if (booksFind.length === 0) {
        setBooksCard(
          <img
            id="book-notFound"
            src={require("../images/livro-nao-encontrado.png")}
            alt="Not Found"
          />
        );
        setCounter("");
        return;
      }
      setCounter(<p>{booksFind.length} livro(s) encontrado(s).</p>);

      // Coloca os livros encontrados no Hook.
      const dataCard = booksFind.map((book) => {
        return (
          <CardBook
            key={book.book_code}
            id={book.book_code}
            title={book.book_name}
            author={book.book_author}
            edition={book.book_edition}
            release_year={book.release_year}
            category={book.category_name}
            language={book.book_language}
            isbn={book.book_isbn}
            cdd={book.book_cdd}
            qtdTotal={book.quantity_total}
            qtdStopped={book.quantity_stopped}
            qtdCirculation={book.quantity_circulation}
            position={book.book_position}
            tombo={book.book_tombo}
          />
        );
      });

      // Atualiza o estado com os livros encontrados.
      setBooksCard(dataCard);
    }, 100);
  }

  // Função padrão de carregamento da página.
  async function loadBooks() {
    setCounter("");
    setBooksCard(spinner);

    const response = await api.get("/book/all");
    setBooks(response.data);
    
    if (!response.data) {
      return setBooksCard("");
    }

    // Organiza os dados chamando os cards dos livros.
    const cards = response.data.map((book) => {
      return (
        <CardBook
          key={book.book_code}
          id={book.book_code}
          title={book.book_name}
          author={book.book_author}
          edition={book.book_edition}
          release_year={book.release_year}
          category={book.category_name}
          language={book.book_language}
          isbn={book.book_isbn}
          cdd={book.book_cdd}
          qtdTotal={book.quantity_total}
          qtdStopped={book.quantity_stopped}
          qtdCirculation={book.quantity_circulation}
          position={book.book_position}
          tombo={book.book_tombo}
        />
      );
    });

    // Coloca as categorias no dataInput sem repetição.
    const categories = response.data.map((book) => {
      return book.category_name;
    });
    const categoriesFilter = categories.filter(
      (category, index) => categories.indexOf(category) === index
    );
    
    setDataInput(categoriesFilter);
    setBooksCard(cards);
    setIsDisabled(false);
  }

  // Carregamento padrão da página.
  useEffect(() => {
    loadBooks();
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
          <h1>Livros</h1>
          {/* Desktop */}
          <div className="pesquisar-container desktop">
            {selectValue === "category" ? (
              <>
                <input
                className="input-pesquisa"
                type="text"
                placeholder="Pesquise aqui"
                onKeyDown={handleKeyDown}
                onChange={(e) => setNameSearch(e.target.value.trim())}
                list="categories"
                />
                <datalist id="categories">
                  {dataInput.map((data) => (
                  <option key={data} value={data} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
              className="input-pesquisa"
              type="text"
              placeholder="Pesquise aqui"
              onKeyDown={handleKeyDown}
              onChange={(e) => setNameSearch(e.target.value.trim())}
              />
            )}
            <select
              className="tipo-pesquisa"
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
            >
              <option value={"title"}>Título</option>
              <option value={"author"}>Autor</option>
              <option value={"category"}>Categoria</option>
            </select>
            <div className="btn-pesquisar-container">
              <button
                className="btn-pesquisar"
                onClick={search}
                disabled={isDisabled}
              >
                <FaSearch />
              </button>
              <button
                className="btn-listar"
                onClick={loadBooks}
                disabled={isDisabled}
              >
                Listar todos
              </button>
            </div>
            
            <div className="btn-cadastrar-container">
              <ModalCadastrarLivro />
            </div>
          </div>
        </div>
        {/* Mobile */}
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
              <option value={"title"}>Título</option>
              <option value={"category"}>Categoria</option>
              <option value={"author"}>Autor</option>
            </select>
            <div className="btn-container"></div>
            <div className="btn-pesquisar-container">
              <button
                className="btn-pesquisar"
                onClick={search}
                disabled={isDisabled}
              >
                <FaSearch />
              </button>
            </div>
            <div className="btn-cadastrar-container">
              <ModalCadastrarLivro />
            </div>
          </div>
        </div>
        <div className="count-container">{counter}</div>
        <div className="cards-container">{booksCard}</div>
      </div>
    </>
  );
}

export default LivrosPage;
