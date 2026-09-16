const traducoes = {
    'chicken': 'frango',
    'onion': 'cebola',
    'garlic': 'alho',
    'salt': 'sal',
    'olive oil': 'azeite',
};
function traduzir(ingrediente) {
    const chave = ingrediente.toLowerCase().trim();
    return traducoes[chave] ?? ingrediente;
}
const input = document.getElementById('busca');
const botao = document.getElementById('botao');
const resultado = document.getElementById('resultado');
async function buscar(nome) {
    resultado.innerHTML = '<p>Carregando...</p>';
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        if (!dados.meals || dados.meals.length === 0) {
            resultado.innerHTML = '<p>Nenhuma receita encontrada.</p>';
            return;
        }
        const receita = dados.meals[0];
        const ingredientes = [];
        for (let i = 1; i <= 20; i++) {
            const nomeIng = receita[`strIngredient${i}`];
            const medida = receita[`strMeasure${i}`];
            if (nomeIng && nomeIng.trim() !== '') {
                ingredientes.push(`${medida} ${traduzir(nomeIng)}`);
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
    catch (erro) {
        resultado.innerHTML = '<p>Erro ao buscar. Verifique sua conexão.</p>';
        console.error(erro);
    }
}
botao.addEventListener('click', () => {
    buscar(input.value);
});
export {};
