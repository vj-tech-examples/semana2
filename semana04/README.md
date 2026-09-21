# Buscador de receitas — Semana 04

App em React que busca receitas na API [TheMealDB](https://www.themealdb.com/) pelo nome e mostra os resultados em cartões, com nome e categoria.

## Tecnologias

- React, com projeto criado pelo Vite
- Tailwind CSS (plugin `@tailwindcss/vite`)
- API pública TheMealDB

## Como rodar

```bash
cd semana04
npm install
npm run dev
```

Depois é só abrir o endereço que aparece no terminal (normalmente `http://localhost:5173`).

## Estrutura

- `src/App.jsx` — componente principal: guarda o estado, busca os dados e monta a tela
- `src/RecipeCard.jsx` — cartão de receita, que recebe `nome` e `categoria` por props
- `src/index.css` — importa o Tailwind
- `vite.config.js` — registra os plugins do React e do Tailwind

## Como funciona

1. A página abre e o `App` aparece. A lista de receitas começa vazia (`useState([])`), então só o título e o campo de busca aparecem.
2. Logo depois de o componente montar, o `useEffect` dispara.
3. Dentro dele, o `fetch` vai até a TheMealDB com o texto da busca na URL.
4. Quando a resposta chega, `setReceitas` guarda a lista no estado.
5. Como o estado mudou, o React desenha a tela de novo, agora com as receitas.

O campo de busca é um input controlado: o valor fica no estado `busca`, e cada tecla chama `setBusca`. Como `busca` está no array de dependências do `useEffect` (`[busca]`), toda mudança no texto dispara uma nova busca.

A lista é montada com `.map()`, que transforma cada receita da API num `<RecipeCard>`. O `key={receita.idMeal}` serve para o React identificar cada item quando a lista muda.

O layout usa grid do Tailwind: uma coluna no celular, duas em telas médias e três em telas grandes.

## Dificuldades que enfrentei

**Branch criada a partir do lugar errado.** Tentei voltar para a `main` com mudanças da semana 03 ainda sem commit. O `git checkout main` falhou, mas o `git checkout -b` seguinte funcionou e criou a branch da semana 04 a partir da branch da semana 03. Resolvi commitando o trabalho pendente na branch certa, voltando para a `main` e recriando a branch dali.

**`useEffect` não aceita função `async` direto.** A solução foi declarar uma função `async` dentro do efeito e chamá-la logo em seguida.

**Quando rodar o efeito.** Com o array de dependências vazio (`[]`), a busca rodava só uma vez, ao abrir a página. Para buscar de novo a cada digitação, coloquei `busca` dentro do array.

**API devolvendo `null`.** Quando a busca não encontra nada, a TheMealDB devolve `meals: null` em vez de uma lista vazia, e o `.map()` quebrava. Resolvi com `setReceitas(dados.meals ?? [])`: se vier `null`, guardo uma lista vazia.

## Limitações conhecidas

- O conteúdo das receitas vem em inglês, porque a TheMealDB só oferece esse idioma.
- A busca é feita a cada tecla digitada.
- Ainda não há mensagem de carregando nem tratamento de erro de rede.