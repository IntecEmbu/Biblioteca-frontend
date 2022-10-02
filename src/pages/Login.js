import React from "react";
import { Link } from "react-router-dom";
import login from "../service/login.js";
import { Spinner } from "react-bootstrap";
import Footer from "../components/Footer.js";
import "../styles/Login.css";

function Index() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [spinner, setSpinner] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  async function tryLogin() {
    try {
      setSpinner(<Spinner id="loading" animation="border" />);
      setIsDisabled(true);
      const response = await login(user, password);
      localStorage.setItem("isSigned", true);

      window.location.href = "/home";
      localStorage.setItem("user", JSON.stringify(response.data[0]));
      setSpinner("");
    } catch (err) {
      console.log(err);
      alert("Usuário ou senha inválidos!");
      setIsDisabled(false);
      setSpinner("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      tryLogin();
    }
  }

  return (
    <div className="color">
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            <div className="logo">
              <img src={require("../images/logo2.png")}></img>
            </div>
            <div className="user">
              <input
                type="text"
                className="input-user"
                placeholder="Usuário"
                onChange={(e) => setUser(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="password">
              <input
                type="password"
                className="input-password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="btn-container">
              <button
                className="btn-entrar"
                onClick={tryLogin}
                disabled={isDisabled}
              >
                Entrar
              </button>
            </div>
            <p className="forgot-password">
              <Link to="/esqueci-senha" className="forgot-password">
                Esqueci minha senha
              </Link>
            </p>
            <div className="spinner-login">{spinner}</div>
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default Index;
