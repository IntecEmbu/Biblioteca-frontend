import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link } from 'react-router-dom';
import './style.css';

function index() {
  return (
    <div id="Area-NavBar">
      
        <Navbar expand="lg" id="navBar">
          <Container>

            <Navbar.Brand>
              <Link to="/">
                <img id='Logo'
                  src='https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png'
                  width="30"
                  height="30"
                />
              </Link>
            </Navbar.Brand>
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="CIRCULAÇÃO" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/emprestimos">EMPRÉSTIMOS</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/devolucoes">DEVOLUÇÕES</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="CATALOGAÇÃO" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/pesquisarlivro">PESQUISAR LIVRO</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/cadastrolivro">CADASTRAR LIVRO</Link>
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="ADMINISTRAÇÃO" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Link to="/relatorios">RELATÓRIOS</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/graficos">GRÁFICOS</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/voluntarios">VOLUNTÁRIOS</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/alunos">ALUNOS</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

          {/* Mexer aqui depois para area do usuario */}
            <Navbar.Collapse className="justify-content-end">
                <img
                  src='https://a.espncdn.com/combiner/i?img=/i/teamlogos/soccer/500/2026.png'
                  width="30"
                  height="30" 
                />
            </Navbar.Collapse>

          </Container>
        </Navbar>

    </div>
  );
}

export default index;