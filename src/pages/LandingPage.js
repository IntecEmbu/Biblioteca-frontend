import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import api from "../service/api.js";

function LandingPage() {
  const [topReaders, setTopReaders] = useState({
    1: "Carregando...",
    2: "Carregando...",
    3: "Carregando...",
  });

  useEffect(() => {
    api.get("/report/top-readers").then((response) => {
      setTopReaders(response.data);
    });
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <div className="Navbar-link item-nav">
          <Link to="/login" id="link-navbar" className="link-navbar-sair">
            Entrar
          </Link>
        </div>
      </div>

      <div id="landing-page">
        <div className="podio-area">
          <span className="podio-title">Leitores do mês</span>
          <div className="podio-container">
            <div className="podio">
              <div className="podio-item">
                <p className="podio-item-name">{topReaders[3]}</p>
                <div id="podio-item-3">3</div>
              </div>
            </div>
            <div className="podio">
              <div className="podio-item">
                <p className="podio-item-name">{topReaders[1]}</p>
                <div id="podio-item-1">1</div>
              </div>
            </div>
            <div className="podio">
              <div className="podio-item">
                <p className="podio-item-name">{topReaders[2]}</p>
                <div id="podio-item-2">2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
