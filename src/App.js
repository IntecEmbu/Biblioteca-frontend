import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.js'
import Navbar from './components/Navbar/Navbar.js'
import Login from './pages/Login/Login.js'
import PesquisarLivro from './pages/PesquisarLivro/PesquisarLivro.js'
import CadastrarLivro from './components/CadastrarLivro/CadastrarLivro.js'
import Alunos from './pages/Alunos/Alunos';
import NotFound from './pages/NotFound/NotFound.js'
import ProtectedRouter from './protectedRouter'
import { useState } from 'react';

function App() {

  const [isSigned, setIsSigned] = useState(localStorage.getItem('isSigned'));

  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route element={<ProtectedRouter isAuth={isSigned} />}>
          <Route path='/' element={<Home />} />
          <Route path='/pesquisar-livro' element={<PesquisarLivro />} />
          <Route path='/cadastrar-livro' element={<CadastrarLivro />} />
          <Route path='/alunos' element={<Alunos />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
