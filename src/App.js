import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import CadastroLivro from './Pages/CadastroLivro'
import NavBar from './Components/Navbar'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Livros from './Pages/Livros'
import DetalhesLivro from './Pages/DetalhesLivro'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/cadastroLivro" element={<CadastroLivro />} />
          <Route path="/pesquisarlivro" element={<Livros />} />
          <Route path="/detalheslivro" element={<DetalhesLivro />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;


  

