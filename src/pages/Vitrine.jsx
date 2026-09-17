import { useState, useEffect } from 'react';
import { listarProdutos, listarCategorias } from '../services/api';
import { CardProduto } from '../components/CardProduto';

export function Vitrine({ busca }) {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSel, setCategoriaSel] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    listarCategorias().then(setCategorias).catch(console.error);
  }, []);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    const timer = setTimeout(() => {
      listarProdutos({ busca, categoria: categoriaSel })
        .then((res) => setProdutos(res.produtos))
        .catch((err) => setErro(err.message))
        .finally(() => setCarregando(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [busca, categoriaSel]);

  return (
    <div className="container">
      <div className="categorias-bar">
        <button
          className={`pilula ${categoriaSel === '' ? 'ativa' : ''}`}
          onClick={() => setCategoriaSel('')}
        >
          Todas
        </button>
        {categorias.slice(0, 8).map((cat) => (
          <button
            key={cat}
            className={`pilula ${categoriaSel === cat ? 'ativa' : ''}`}
            onClick={() => setCategoriaSel(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {carregando && <p style={{ padding: '20px 0' }}>Carregando produtos...</p>}
      {erro && <p style={{ color: 'red', padding: '20px 0' }}>{erro}</p>}

      {!carregando && !erro && (
        <>
          {produtos.length === 0 ? (
            <p style={{ padding: '20px 0' }}>Nenhum produto encontrado.</p>
          ) : (
            <div className="grid-produtos">
              {produtos.map((p) => (
                <CardProduto key={p.id} produto={p} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}