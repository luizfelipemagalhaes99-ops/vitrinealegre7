import { Link, useNavigate } from 'react-router-dom';
import { useCarrinho } from '../context/CarrinhoContext';

export function Cabecalho({ busca, setBusca }) {
  const { totalItens } = useCarrinho();
  const navigate = useNavigate();

  const handleBusca = (e) => {
    setBusca(e.target.value);
    navigate('/');
  };

  return (
    <header>
      <div className="container header-content">
        <Link to="/" className="logo">
          <span className="logo-badge">V</span> Vitrine Alegre
        </Link>
        <input
          type="text"
          placeholder="Buscar produtos..."
          className="busca-input"
          value={busca || ''}
          onChange={handleBusca}
        />
        <Link to="/carrinho" className="btn-carrinho">
          🛒 Carrinho <span className="badge">{totalItens}</span>
        </Link>
      </div>
    </header>
  );
}