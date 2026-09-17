const BASE_URL = 'https://dummyjson.com';

export const COTACAO = 5.20;

export function formatarPreco(valorEmDolar) {
  const valorEmReal = valorEmDolar * COTACAO;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valorEmReal);
}

export function calcularPrecoFinal(price, discountPercentage) {
  return price * (1 - discountPercentage / 100);
}

export async function listarProdutos({ pagina = 1, limite = 12, busca = '', categoria = '', ordenacao = '' }) {
  const skip = (pagina - 1) * limite;
  let url = `${BASE_URL}/products?limit=${limite}&skip=${skip}`;

  if (busca) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(busca)}&limit=${limite}&skip=${skip}`;
  } else if (categoria) {
    url = `${BASE_URL}/products/category/${encodeURIComponent(categoria)}?limit=${limite}&skip=${skip}`;
  }

  if (ordenacao) {
    const [sortBy, order] = ordenacao.split('-');
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Não foi possível carregar os produtos.');
  }

  const data = await response.json();
  return {
    produtos: data.products || [],
    total: data.total || 0,
    skip: data.skip || 0,
    limit: data.limit || 12,
  };
}

export async function buscarProdutoPorId(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Produto não encontrado.');
  }
  return await response.json();
}

export async function listarCategorias() {
  const response = await fetch(`${BASE_URL}/products/category-list`);
  if (!response.ok) {
    throw new Error('Falha ao carregar categorias.');
  }
  return await response.json();
}