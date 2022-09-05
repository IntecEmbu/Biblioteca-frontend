import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import PesquisarLivro from './pages/PesquisarLivro.js'
import CadastrarLivro from './components/CadastrarLivro.js'
import Alunos from './pages/Alunos';
import Voluntarios from './pages/Voluntarios';
import NotFound from './pages/NotFound.js'
import ProtectedRouter from './protectedRouter'
import { useState } from 'react';

function App() {

  const [isSigned, setIsSigned] = useState(localStorage.getItem('isSigned'));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRouter isAuth={isSigned} />}>
          <Route path='/' element={<Home />} />
          <Route path='/pesquisar-livro' element={<PesquisarLivro />} />
          <Route path='/cadastrar-livro' element={<CadastrarLivro />} />
          <Route path='/alunos' element={<Alunos />} />
          <Route path='/voluntarios' element={<Voluntarios />} />
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
