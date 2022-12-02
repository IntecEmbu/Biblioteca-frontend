import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Sobre.css";
import Card from "../components/Cards/Sobre";
import * as FaIcons from "react-icons/fa";

function Sobre() {
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <Link to="/">
            <img src="logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="Navbar-link item-nav">
          <Link to="/sobre" id="link-navbar" className="link-navbar-sair">
            Sobre
          </Link>
        </div>
        <div className="Navbar-link item-nav">
          <Link to="/login" id="link-navbar" className="link-navbar-sair">
            Entrar
          </Link>
        </div>
      </div>

    <div className="pagina-container">
      <div className="container-sobre">
        <Card 
        position={false}
        img={(<img src={require("../images/estress.png")} />)}/>

        <Card 
        position={true}
        img={(<img src={require("../images/meeting.png")} />)}/>

        <Card 
        position={false}
        img={(<img src={require("../images/library.png")} />)}/>
      </div>
    </div>

    <div className="footer">
        <ul class="icons">
            <li><a href="#"><FaIcons.FaGithub /></a></li>
            <li><a href="#"><FaIcons.FaInstagram /></a></li>
        </ul>
    </div>
    </>
  )
}

export default Sobre