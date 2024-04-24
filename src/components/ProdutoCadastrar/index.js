import React, { useState } from "react";
import { cadastroDeProduto } from "../ProdutoServico";

function ProdutoCadastrar() {
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("");
  const [custo, setCusto] = useState("");
  const [quantidadeNoEstoque, setQuantidadeNoEstoque] = useState("");
  const [erro, setErro] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const produto = {
      descricao,
      categoria,
      custo: parseFloat(custo),
      quantidadeNoEstoque: parseInt(quantidadeNoEstoque),
    };

    cadastroDeProduto(produto)
      .then((response) => {
        console.log("Resposta da API:", response.data);
        // Limpar o estado de erro, caso tenha ocorrido algum erro anteriormente
        setErro(null);
        
      })
      .catch((error) => {
        console.error("Erro ao cadastrar produto:", error);
        // Verificar se há uma resposta de erro da API
        if (error.response) {
          console.error("Código de status da API:", error.response.status);
          // Armazenar o erro no estado para exibição na interface
          setErro(error.response.data.message); 
        }
      });
  };

  return (
    <div>
      <h2>Cadastrar Produto</h2>
      {erro && <p style={{ color: "red" }}>{erro}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição: </label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Categoria: </label>
          <input
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Custo:</label>
          <input
            type="number"
            step="0.01"
            value={custo}
            onChange={(e) => setCusto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantidade no Estoque: </label>
          <input
            type="number"
            value={quantidadeNoEstoque}
            onChange={(e) => setQuantidadeNoEstoque(e.target.value)}
            required
          />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ProdutoCadastrar;