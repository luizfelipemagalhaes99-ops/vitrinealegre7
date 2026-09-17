import { createContext, useContext, useState, useEffect } from 'react';
import { COTACAO, calcularPrecoFinal } from '../services/api';

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    const salvo = localStorage.getItem('vitrine_alegre_carrinho');
    return salvo ? JSON.parse(salvo) : [];
  });

  useEffect(() => {
    localStorage.setItem('vitrine_alegre_carrinho', JSON.stringify(itens));
  }, [itens]);

  const adicionarAoCarrinho = (produto, quantidade = 1) => {
    setItens((prevItens) => {
      const index = prevItens.findIndex((item) => item.id === produto.id);
      if (index > -1) {
        const novos = [...prevItens];
        novos[index].quantidade += quantidade;
        return novos;
      } else {
        return [...prevItens, { ...produto, quantidade }];
      }
    });
  };

  const removerDoCarrinho = (id) => {
    setItens((prev) => prev.filter((item) => item.id !== id));
  };

  const atualizarQuantidade = (id, quantidade) => {
    if (quantidade <= 0) {
      removerDoCarrinho(id);
      return;
    }
    setItens((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantidade } : item))
    );
  };

  const limparCarrinho = () => setItens([]);

  const totalItens = itens.reduce((sum, item) => sum + item.quantidade, 0);

  const subtotalSemDesconto = itens.reduce(
    (acc, item) => acc + item.price * item.quantidade * COTACAO,
    0
  );

  const totalComDesconto = itens.reduce((acc, item) => {
    const precoFinal = calcularPrecoFinal(item.price, item.discountPercentage);
    return acc + precoFinal * item.quantidade * COTACAO;
  }, 0);

  const totalDesconto = subtotalSemDesconto - totalComDesconto;

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        totalItens,
        subtotalSemDesconto,
        totalDesconto,
        totalComDesconto,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export const useCarrinho = () => useContext(CarrinhoContext);