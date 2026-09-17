import { Link } from 'react-router-dom';
import { formatarPreco, calcularPrecoFinal } from '../services/api';
import { useCarrinho } from '../context/CarrinhoContext';

export function CardProduto({ produto }) {
  const { adicionarAoCarrinho } = useCarrinho();
  const precoFinal = calcularPrecoFinal(produto.price, produto.discountPercentage);

  return (
    <div className="card-produto">
      {produto.discountPercentage >= 5 && (
        <span className="selo-desconto">-{Math.round(produto.discountPercentage)}%</span>
      )}
      <Link to={`/produtos/${produto.id}`}>
        <img src={produto.thumbnail} alt={produto.title} className="card-img" />
      </Link>
      <span className="card-categoria">{produto.category}</span>
      <h3 className="card-titulo">{produto.title}</h3>
      <p>⭐ {produto.rating}</p>
      {produto.discountPercentage >= 5 && (
        <span className="preco-antigo">{formatarPreco(produto.price)}</span>
      )}
      <div className="preco-final">{formatarPreco(precoFinal)}</div>
      <button
        className="btn-adicionar"
        onClick={() => adicionarAoCarrinho(produto)}
      >
        Adicionar
      </button>
    </div>
  );
}