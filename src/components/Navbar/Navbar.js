import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../styles/Navbar.css'

function index() {

  function logout() {
    localStorage.removeItem('isSigned')
    window.location.href = '/'
  }

  return (
    <Navbar id="nav" expand='lg' variant='ligth'>
      <Container>
        <Navbar.Brand id="logo-nav">
          <Link to='/'>
            <img
              src={require('../Imagens/logo2.png')}
              width="30"
              height="30"
              className="d-inline-block align-top img-logo-nav"
              alt="Logo"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Circulação" id="basic-nav-dropdown">
              <NavDropdown.Item className="item-dropdown">
                <Link to='/emprestimos' id="link-navbar">Empréstimos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="item-dropdown">
                <Link to='/devolucoes' id="link-navbar">Devoluções</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Catalogação" id="basic-nav-dropdown">
              <NavDropdown.Item className="item-dropdown">
                <Link to='/pesquisar-livro' id="link-navbar">Pesquisar Livro</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="item-dropdown">
                <Link to='/cadastrar-livro' id="link-navbar">Cadastrar Livro</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Administração" id="basic-nav-dropdown">
              <NavDropdown.Item className="item-dropdown">
                <Link to='/relatorios' id="link-navbar">Relatórios</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="item-dropdown">
                <Link to='/voluntarios' id="link-navbar">Voluntários</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="item-dropdown">
                <Link to='/alunos' id="link-navbar">Alunos</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link>
            <Link to='/login' id="link-navbar" className="link-navbar-sair" onClick={logout}>Sair</Link>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default index