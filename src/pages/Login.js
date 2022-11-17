import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../service/api.js";
import Footer from "../components/Footer.js";
import "../styles/Login.css";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Index() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState("password");
  const [icon, setIcon] = React.useState(<AiFillEyeInvisible/>);
  const ToastConfig = {
    position: "top-center",
    autoClose: 2000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    hideProgressBar: true,
    closeButton: false,
  }
  const navigate = useNavigate()

  function validate() {
    toast.dismiss();

    if(!user && !password) {
      toast.warn("Preencha o usuário e senha", ToastConfig);
      return false;
    }

    if (!user) {
      toast.warning("Por favor, insira o usuário", ToastConfig);
      return false;
    }

    if (!password) {
      toast.warning("Por favor, insira a senha", ToastConfig);
      return false;
    }

    return true;
  }

  async function tryLogin() {
    if (validate()) {
      try {
        setIsDisabled(true);

        const response = await toast.promise(
          api.post("/librian/login-collaborator", {user, password}), 
          {
            pending: "Aguarde, estamos verificando suas credenciais",
            success: "Login realizado com sucesso",
            error: {
              render: (error) => {
                return error.data.response.data.message || "Servidor indisponível"; 
              }
          }
        }, ToastConfig);

        sessionStorage.setItem("isSigned", true);
        sessionStorage.setItem("user", JSON.stringify(response.data.data[0]));

        navigate("/home");
      } catch (err) {
        // console.log(err);
        setIsDisabled(false);
      }
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      if(!isDisabled) {
        tryLogin();
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("isSigned") && sessionStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <div className="color">
      <ToastContainer/>
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            <div className="logo">
              <img src="logo2.png"></img>
            </div>
            <div className="user">
              <input
                type="text"
                className="input-user"
                placeholder="E-mail ou usuário"
                onChange={(e) => {
                  setUser(e.target.value.trim());
                  toast.dismiss();
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="password">
              <input
                type={showPassword}
                className="input-password"
                placeholder="Senha"
                onChange={(e) => {
                  setPassword(e.target.value.trim());
                  toast.dismiss();
                }}
                onKeyDown={handleKeyDown}
              />
              <div className="show-password" onClick={() => {
                if(showPassword === "password"){
                  setShowPassword("text");
                  setIcon(<AiFillEye/>);
                }else{
                  setShowPassword("password");
                  setIcon(<AiFillEyeInvisible/>);
                }
                }}>
                {icon}
              </div>
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
          </div>
        </div>
      </div>
      <div className="footer-container desktop">
        <Footer />
      </div>
    </div>
  );
}

export default Index;
