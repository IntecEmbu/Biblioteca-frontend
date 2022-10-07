import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar/sidebar.js";
import "../styles/Navbar.css";
import * as FaIcons from "react-icons/fa";

function index() {
  function logout() {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isSigned");
  }

  return (
    <>
      <Navbar variant="light" className="Navbar">
        <Container>
          <Navbar.Brand id="logo-nav">
            <Link to="/home">
              <img
                src={require("../images/logo.png")}
                width="30"
                height="30"
                className="d-inline-block align-top img-logo-nav"
                alt="Logo"
              />
            </Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="item-nav">
              <Link to="/livros" id="link-navbar">
                Livros
              </Link>
            </Nav.Link>
            <Nav.Link className="item-nav">
              <Link to="/emprestimos" id="link-navbar">
                Empréstimos
              </Link>
            </Nav.Link>
            <Nav.Link className="item-nav">
              <Link to="/alunos" id="link-navbar">
                Alunos
              </Link>
            </Nav.Link>
            <Nav.Link className="item-nav">
              <Link to="/voluntarios" id="link-navbar">
                Voluntários
              </Link>
            </Nav.Link>
            <Nav.Link className="item-nav">
              <Link to="/relatorios" id="link-navbar">
                Relatórios
              </Link>
            </Nav.Link>
          </Nav>
          <Nav.Link>
            <Link
              to="/"
              id="link-navbar"
              className="link-navbar-sair"
              onClick={logout}
            >
              <FaIcons.FaSignOutAlt />
            </Link>
          </Nav.Link>
        </Container>
      </Navbar>

      <Sidebar clasName="Sidebar" />
    </>
  );
}

export default index;
