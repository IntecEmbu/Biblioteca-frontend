import React from 'react'
import { Navbar, Container, NavDropdown, Figure } from 'react-bootstrap';
import Logo from '../Imagem/branco.png';
import Login from '../Imagem/login.png';
import './style.css'

function Main() {
    return (
    <Navbar style={{backgroundColor:'#192039', width:'100%', heigth:'20%'}}>
      
      <div style={{backgroundColor:'#192039'}}>
      <img src={Logo} style={{width:'4%', display: 'inline-block', backgroundColor: '#192039', marginLeft:'4%', marginTop:'0%'}}  />  

        <NavDropdown  title="Circulação"  placeholder-shown='' style={{marginLeft:'10%', display: 'inline-block', backgroundColor: '#192039', color:'#D9D9D9', outlineColor:'#FFFF'}}>
              <NavDropdown.Item href="#action1" style={{ outlineColor:'black'}}>cadastro</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Empréstimos</NavDropdown.Item>              
              <NavDropdown.Item href="#action3">Devoluções</NavDropdown.Item>
            </NavDropdown>
        <NavDropdown  title="Catalogação"  style={{marginLeft:'5%', display: 'inline-block', backgroundColor: '#192039', color:'#D9D9D9'}}>
              <NavDropdown.Item href="#action4">Bibliográfica</NavDropdown.Item>           
              <NavDropdown.Item href="#action5">Autoridades</NavDropdown.Item>
              <NavDropdown.Item href="#action6">Vocabulário</NavDropdown.Item>
              <NavDropdown.Item href="#action7">Importação</NavDropdown.Item>
              <NavDropdown.Item href="#action8">Etiquetas</NavDropdown.Item>
              <NavDropdown.Item href="#action9">Mover registro</NavDropdown.Item>
        </NavDropdown>
              <NavDropdown title="Administração"  style={{marginLeft:'5%', display: 'inline-block', backgroundColor: '#192039', color:'#D9D9D9'}}>
              <NavDropdown.Item href="#action10">Troca de Senha</NavDropdown.Item>
              <NavDropdown.Item href="#action11">Manutenção</NavDropdown.Item>
              <NavDropdown.Item href="#action12">Relatórios</NavDropdown.Item>
              <NavDropdown.Item href="#action13">Logins e Permissões</NavDropdown.Item>
              <NavDropdown.Item href="#action14">Típos de Usuarios</NavDropdown.Item>
              <NavDropdown.Item href="#action15">Configuração</NavDropdown.Item>
            </NavDropdown>
            <img src={Login} style={{width:'2%', marginLeft:'43%'}}></img>
       <NavDropdown style={{marginLeft:'0%', display: 'inline-block', backgroundColor: '#192039', color:'#D9D9D9'}}>
      </NavDropdown></div>
    </Navbar>
    
    
    );
  }
  
  export default Main;
  