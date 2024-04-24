import axios from "axios";
const url1 = "http://localhost:8080/api/v1/produtos";
export const listaDeProdutos = () => axios.get(url1);
export const cadastroDeProduto = (produto) => axios.post(url1, produto);