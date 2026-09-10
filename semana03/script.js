const input = document.getElementById('busca');
const botao = document.getElementById('botao');
const resultado = document.getElementById('resultado');

async function buscar(nome) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
  const resposta = await fetch(url);
  const dados = await resposta.json();
  const receita = dados.meals[0];

  const ingredientes = [];

  for (let i = 1; i <= 20; i++) {
    const nomeIng = receita[`strIngredient${i}`];
    const medida = receita[`strMeasure${i}`];

    if (nomeIng && nomeIng.trim() !== '') {
      ingredientes.push(`${medida} ${nomeIng}`);
    }
  }

   resultado.innerHTML = `
    <h2>${receita.strMeal}</h2>
    <img src="${receita.strMealThumb}" alt="${receita.strMeal}" width="300">
    <h3>Ingredientes</h3>
    <ul>
      ${ingredientes.map(item => `<li>${item}</li>`).join('')}
    </ul>
  `;

  }

botao.addEventListener('click', () => {
  buscar(input.value);
});