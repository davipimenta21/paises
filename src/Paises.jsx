import './Paises.css'
import React, { useEffect, useState } from 'react';
import json_paises from './paises.json';

const Paises = () => {
  const [paises, selecaoP] = useState([]);
  const [favoritos, selecaoF] = useState([]);

  useEffect(() => {
    const filtroP = json_paises.map(pais => ({
      id: pais.numericCode,
      nome: pais.name,
      bandeira: pais.flag,
      populacao: pais.population
    }));
    filtroP.sort((a, b) => a.nome.localeCompare(b.nome));
    selecaoP(filtroP);
  }, []);

  const Favoritos = (id) => {
    const pais = paises.find(p => p.id === id);
    selecaoF([...favoritos, pais]);
    selecaoP(paises.filter(p => p.id !== id));
  };

  const Remover = (id) => {
    const pais = favoritos.find(f => f.id === id);
    selecaoP([...paises, pais]);
    selecaoF(favoritos.filter(f => f.id !== id));
  };

  return (
    <div className="corpo">
      <div className="lista-paises">
        <h2>Países ({paises.length})</h2>
        <ul>
            <p>População total: {paises.reduce((acc, pais) => acc + pais.populacao, 0).toLocaleString()}</p>
          {paises.map(pais => (
            <li key={pais.id}>
              <button onClick={() => Favoritos(pais.id)}>+</button>
              <img src={pais.bandeira} alt={'Bandeira de ${pais.nome}'} width="50" />
              <span>{pais.nome} - População: {pais.populacao.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="lista-paises">
        <h2>Países Favoritos ({favoritos.length})</h2>
        <ul>
            <p>População total: {favoritos.reduce((acc, pais) => acc + pais.populacao, 0).toLocaleString()}</p>
          {favoritos.map(pais => (
            <li key={pais.id}>
              <button id='btnRemover' onClick={() => Remover(pais.id)}>-</button>
              <img src={pais.bandeira} alt={'Bandeira de ${pais.nome}'} width="50" />
              <span>{pais.nome} - População: {pais.populacao.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Paises;