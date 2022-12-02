import React, { useState, useEffect } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { tost, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../service/api.js";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

export default function EsqueciSenha() {

  const [step, setStep] = useState(1); // 1 = email, 2 = confirmação, 3 = nova senha, 4 = sucesso
  const navigate = useNavigate()

  useEffect(() => {
    if (sessionStorage.getItem("isSigned") && sessionStorage.getItem("user")) {
      navigate("/home");
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
  const [timerValue , setTimerValue] = useState(60); // tempo de espera para reenviar o email

  async function verifyEmail(){
    toast.dismiss()
    const re = /\S+@\S+\.\S+/;

    if(step === 1){
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
    }

    try{
      await toast.promise(
        api.post("/librian/new-password", {email}), 
        {
          pending: "Aguarde...", 
          success: "Email enviado com sucesso!", 
          error: {
            render: (error) => {
              console.log(error.data.response.data)
              return error.data.response.data.message || "Servidor indisponível";
            }
          }
        },
        ToastConfig
      );
      setStep(2);
      timer() 
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
              return error.data.response.data.message || "Servidor indisponível";
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
              return error.data.response.data.message || "Servidor indisponível";
            }
          }
        },
        ToastConfig
      );

      setStep(4);
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

  async function timer(){
    let timer = 60
    for(let i = 0; i < 60; i++){
      await new Promise(resolve => setTimeout(resolve, 1000));
      timer--;
      setTimerValue(timer);
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
                    {timerValue > 0 && (
                      <button className="btn-avancar">{timerValue}</button>
                    ) || (
                      <button className="btn-avancar" onClick={verifyEmail}>Reenviar</button>
                    )}
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
            { step === 4 && (
              <>
                <div className="sucesso-senha-container">
                  <p>Senha alterada com sucesso!</p>
                  <div className="btn-esqueci-container">
                    <Link to="/login" className="link-not-found">
                      <button className="btn-voltar-login" >
                        <FaArrowLeft /> 
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
