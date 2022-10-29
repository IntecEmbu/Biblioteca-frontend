import React, { useState, useEffect } from "react";
import Footer from "../components/Footer.js";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { tost, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../service/api.js";
import InputMask from "react-input-mask";

export default function EsqueciSenha() {

  const [step, setStep] = useState(1); // 1 = email, 2 = confirmação, 3 = nova senha

  useEffect(() => {
    if (sessionStorage.getItem("isSigned") && sessionStorage.getItem("user")) {
      window.location.href = "/home";
    }
  }, []);

  const ToastConfig = {
    position: "top-center",
    autoClose: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
    hideProgressBar: true,
    closeButton: false,
  }

  const [email, setEmail] = useState(""); 
  const [token, setToken] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  async function verifyEmail(){
    toast.dismiss()
    const re = /\S+@\S+\.\S+/;

    if(!email || !confirmEmail){
      toast.warn("Preencha os campos", ToastConfig);
      return false;
    } else if (!re.test(email) || !re.test(confirmEmail)) {
      toast.warn("Email inválido", ToastConfig);
      return false;
    } else if (email !== confirmEmail) {
      toast.warn("Os emails não são iguais", ToastConfig);
      return false;
    }

    try{
      await toast.promise(
        api.post("/librian/new-password", {email}), 
        {
          pending: "Verificando...", 
          success: "Email enviado com sucesso!", 
          error: {
            render: (error) => {
              return error.data.response.data.message;
            }
          }
        },
        ToastConfig
      );
      setStep(2); 
    } catch (err) {
      // console.log(err);
    }
  }

  async function verifyToken(){
    toast.dismiss()

    if(!token){
      toast.warn("Preencha o token", ToastConfig);
      return false;
    }

    try{
      await toast.promise(
        api.post("/librian/verify-code", {code: token, email}),
        {
          pending: "Verificando...", 
          success: "Token válido!", 
          error: {
            render: (error) => {
              return error.data.response.data.message;
            }
          }
        },
        ToastConfig
      );
      setStep(3);
    } catch (err) {
      // console.log(err);
    }
  }

  async function changePassword(){
    toast.dismiss()

    if(!password || !confirmPassword){
      toast.warn("Preencha os campos", ToastConfig);
      return false;
    } else if (password !== confirmPassword) {
      toast.warn("As senhas não são iguais", ToastConfig);
      return false;
    }

    try{
      await toast.promise(
        api.post("/librian/change-password", {email, password, code: token}),
        {
          pending: "Alterando...", 
          success: "Senha alterada com sucesso!", 
          error: {
            render: (error) => {
              return error.data.response.data.message;
            }
          }
        },
        ToastConfig
      );

      // depois de 5 segundos, redireciona para a página de login
      setTimeout(() => {
        window.location.href = "/login";
      }, 5000);
    }
    catch (err) {
      // console.log(err);
    }
  }

  function handleKeyDown(e){
    if(step === 1){
      if(e.key === "Enter"){
        verifyEmail();
      }
    } else if (step === 2) {
      if(e.key === "Enter"){
        verifyToken();
      }
    } else if (step === 3) {
      if(e.key === "Enter"){
        changePassword();
      }
    }
  }

  return (
    <div className="color">
      <ToastContainer />
      <div className="form-container">
        <div className="form">
          <div className="form-content">
            { step === 1 && (
              <>
                <div className="user">
                  <input
                    type="text"
                    className="input-user"
                    placeholder="Informe seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    onKeyDown={handleKeyDown} 
                  />
                </div>
                <div className="user">
                  <input
                    type="text"
                    className="input-user"
                    placeholder="Confirme seu e-mail"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value.trim())}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="btn-esqueci-container">
                  <Link to="/login" className="link-not-found">
                    <button className="btn-voltar-login" >
                      <FaArrowLeft />
                    </button>
                  </Link>
                  <button className="btn-avancar" onClick={verifyEmail}>Avançar</button>
                </div>
            </>
            )}
            { step === 2 && (
              <>
                <div className="user">
                  <InputMask
                    mask="999999"
                    maskChar=""
                    className="input-user"
                    placeholder="Informe o token"
                    value={token}
                    onChange={(e) => setToken(e.target.value.trim())}
                    onKeyDown={handleKeyDown}
                  ></InputMask>
                </div>
                <div className="btn-esqueci-container">
                  <Link to="/login" className="link-not-found">
                    <button className="btn-voltar-login" >
                      <FaArrowLeft />
                    </button>
                  </Link>
                  <button className="btn-avancar" onClick={verifyToken}>Avançar</button>
                </div>
              </>
            )}
            { step === 3 && (
              <>
                <div className="user">
                  <input
                    type="text"
                    className="input-user"
                    placeholder="Informe sua nova senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="user">
                  <input
                    type="text"
                    className="input-user"
                    placeholder="Confirme sua nova senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value.trim())}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="btn-esqueci-container">
                  <Link to="/login" className="link-not-found">
                    <button className="btn-voltar-login" >
                      <FaArrowLeft />
                    </button>
                  </Link>
                  <button className="btn-avancar" onClick={changePassword}>Avançar</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}
