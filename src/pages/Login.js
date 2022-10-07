import React, { useEffect } from "react";
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
  const [errors, setErrors] = React.useState({});
  const [invalid, setInvalid] = React.useState("");

  function validate() {
    let errors = {};

    if (!user) {
      errors.user = "Usuário é obrigatório";
    }

    if (!password) {
      errors.password = "Senha é obrigatória";
    }

    if (errors.user || errors.password) {
      setErrors(errors);
      return false;
    }
    return true;
  }

  async function tryLogin() {
    if (validate()) {
      try {
        setSpinner(<Spinner id="loading" animation="border" />);
        setIsDisabled(true);

        const response = await login(user, password);

        sessionStorage.setItem("isSigned", true);
        sessionStorage.setItem("user", JSON.stringify(response.data[0]));

        window.location.href = "/home";
        setSpinner("");
      } catch (err) {
        console.log(err);
        setInvalid(<p className="invalid">Usuário ou senha inválidos</p>);
        setIsDisabled(false);
        setSpinner("");
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      tryLogin();
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("isSigned")) {
      window.location.href = "/home";
    }
  }, []);

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
                onChange={(e) => {
                  setUser(e.target.value);
                  setErrors({ ...errors, user: "" });
                  setInvalid("");
                }}
                onKeyDown={handleKeyDown}
              />
              {errors.user && <p className="error-message">{errors.user}</p>}
            </div>
            <div className="password">
              <input
                type="password"
                className="input-password"
                placeholder="Senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                  setInvalid("");
                }}
                onKeyDown={handleKeyDown}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>
            <div className="invalid-container">{invalid}</div>
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
