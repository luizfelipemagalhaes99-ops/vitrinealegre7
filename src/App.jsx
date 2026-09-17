import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { Cabecalho } from './components/Cabecalho';
import { Vitrine } from './pages/Vitrine';
import { Carrinho } from './pages/Carrinho';

export default function App() {
  const [busca, setBusca] = useState('');

  return (
    <CarrinhoProvider>
      <BrowserRouter>
        <Cabecalho busca={busca} setBusca={setBusca} />
        <main>
          <Routes>
            <Route path="/" element={<Vitrine busca={busca} />} />
            <Route path="/carrinho" element={<Carrinho />} />
          </Routes>
        </main>
        <footer>
          <div className="container">
            Projeto acadêmico - Ifes Campus de Alegre - TADS
          </div>
        </footer>
      </BrowserRouter>
    </CarrinhoProvider>
  );
}