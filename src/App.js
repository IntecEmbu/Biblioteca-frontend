import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Livros from "./pages/Livros.js";
import Emprestimos from "./pages/Emprestimos.js";
import Alunos from "./pages/Alunos";
import Voluntarios from "./pages/Voluntarios";
import Relatorios from "./pages/Relatorios";
import Login from "./pages/Login.js";
import EsqueciSenha from "./pages/EsqueciSenha.js";
import NotFound from "./pages/NotFound.js";
import LandingPage from "./pages/LandingPage";
import Sobre from "./pages/Sobre";
import ProtectedRouter from "./protectedRouter";
import { useState } from "react";

function App() {
  const [isSigned, setIsSigned] = useState(sessionStorage.getItem("isSigned"));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRouter isAuth={isSigned} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/livros" element={<Livros />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/voluntarios" element={<Voluntarios />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
