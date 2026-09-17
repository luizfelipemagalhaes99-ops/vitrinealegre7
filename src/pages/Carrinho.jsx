import { useCarrinho } from '../context/CarrinhoContext';
import { formatarPreco } from '../services/api';
import { Link } from 'react-router-dom';

export function Carrinho() {
  const { itens, removerDoCarrinho, atualizarQuantidade, totalComDesconto, totalDesconto, subtotalSemDesconto } = useCarrinho();

  if (itens.length === 0) {
    return (
      <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
        <h2>Seu carrinho está vazio</h2>
        <br />
        <Link to="/" className="btn-adicionar" style={{ textDecoration: 'none', padding: '10px 20px' }}>
          Ir para a vitrine
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2>Seu carrinho</h2>
      <br />
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div>
          {itens.map((item) => (
            <div key={item.id} style={{ display: 'flex', gap: '16px', background: 'white', padding: '16px', borderRadius: '8px', marginBottom: '12px', alignItems: 'center' }}>
              <img src={item.thumbnail} alt={item.title} width="60" />
              <div style={{ flex: 1 }}>
                <h4>{item.title}</h4>
                <p>{formatarPreco(item.price)} cada</p>
              </div>
              <div>
                <button onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                <span style={{ margin: '0 8px' }}>{item.quantidade}</span>
                <button onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
              </div>
              <button onClick={() => removerDoCarrinho(item.id)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>❌</button>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', height: 'fit-content' }}>
          <h3>Resumo do pedido</h3>
          <hr style={{ margin: '12px 0' }} />
          <p>Subtotal: {formatarPreco(subtotalSemDesconto / 5.20)}</p>
          <p style={{ color: 'green' }}>Desconto: -{formatarPreco(totalDesconto / 5.20)}</p>
          <h4>Total: {formatarPreco(totalComDesconto / 5.20)}</h4>
          <br />
          <button className="btn-adicionar">Finalizar compra</button>
        </div>
      </div>
    </div>
  );
}