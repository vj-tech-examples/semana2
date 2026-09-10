import { saudacao } from './pessoa.js';

const usuario = { nome: 'Gabriel', idade: 17, cidade: 'Porto Alegre' };

const { nome, idade, cidade } = usuario;

console.log(`Nome: ${nome}, idade: ${idade}, cidade: ${cidade}`);


console.log(saudacao(usuario));

const { profissao = 'Estudante' } = usuario;

console.log(`Profissão: ${profissao}`);