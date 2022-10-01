import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function index() {
  function logout() {
    localStorage.removeItem("isSigned");
    window.location.href = "/";
  }

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand id="logo-nav">
          <Link to="/">
            <img
              src={require("../images/logo2.png")}
              width="30"
              height="30"
              className="d-inline-block align-top img-logo-nav"
              alt="Logo"
            />
          </Link>
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link className="item-dropdown">
            <Link to="/livros" id="link-navbar">
              Livros
            </Link>
          </Nav.Link>
          <Nav.Link className="item-dropdown">
            <Link to="/emprestimos" id="link-navbar">
              Empréstimos
            </Link>
          </Nav.Link>
          <Nav.Link className="item-dropdown">
            <Link to="/alunos" id="link-navbar">
              Alunos
            </Link>
          </Nav.Link>
          <Nav.Link className="item-dropdown">
            <Link to="/voluntarios" id="link-navbar">
              Voluntários
            </Link>
          </Nav.Link>
          <Nav.Link className="item-dropdown">
            <Link to="/relatorios" id="link-navbar">
              Relatórios
            </Link>
          </Nav.Link>
        </Nav>
        <Nav.Link>
          <Link
            to="/login"
            id="link-navbar"
            className="link-navbar-sair"
            onClick={logout}
          >
            Sair
          </Link>
        </Nav.Link>
      </Container>
    </Navbar>
  );
}

export default index;
