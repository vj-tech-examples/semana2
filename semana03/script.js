const input = document.getElementById('busca');
const botao = document.getElementById('botao');
const resultado = document.getElementById('resultado');

async function buscar(nome) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  const receita = dados.meals[0];

  console.log('nome:', receita.strMeal);
  console.log('foto:', receita.strMealThumb);
  console.log('primeiro ingrediente:', receita.strIngredient1);
}

botao.addEventListener('click', () => {
  buscar(input.value);
});