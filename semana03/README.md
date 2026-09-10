# Buscador de receitas — Semana 03

App que busca uma receita na API [TheMealDB](https://www.themealdb.com/api.php) e exibe a foto e os ingredientes na tela.

Projeto desenvolvido durante a Semana 03 do programa de formação.

## Como rodar

O projeto usa módulos ES (`type="module"`), então precisa ser servido por HTTP — abrir o `index.html` direto pelo navegador não funciona.

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Funcionalidades

- Busca de receita por nome
- Exibe título, foto e a lista de ingredientes com as quantidades
- Mostra "Carregando..." enquanto a busca acontece
- Mostra mensagem quando nenhuma receita é encontrada
- Trata falha de conexão sem quebrar a página

## Tecnologias

- HTML, CSS e JavaScript
- `fetch` com `async/await`
- API pública TheMealDB

## Estrutura

```
semana03/
├── index.html     # estrutura da página (campo, botão e área de resultado)
├── style.css      # estilos
├── script.js      # busca na API e montagem da tela
├── objetos.js     # exercícios de objetos e desestruturação
├── pessoa.js      # função exportada, usada para praticar módulos
└── package.json   # marca o projeto como módulo ES
```

## Dificuldades que enfrentei e como resolvi

### 1. Entender a diferença entre o editor e o terminal

No começo eu não tinha claro onde cada coisa ia. Tentei rodar `node objetos.js` antes de criar o arquivo e recebi `Cannot find module`. O erro me ensinou uma coisa útil: ele diz exatamente qual caminho procurou.

Ficou assim na minha cabeça: **terminal** é para comandos do sistema (`mkdir`, `ls`, `node`, `git`) e o **editor** é onde o código é escrito. Escrevo no VS Code, salvo, e mando o terminal executar.

### 2. Módulos: `import` e `export`

Separar a função `saudacao` num arquivo próprio e importar no outro foi meu primeiro contato com módulos. O conceito é o que sustenta a organização de qualquer projeto React: em vez de um arquivo gigante, cada peça no seu lugar e o `import` busca o que precisa.

### 3. O erro de CORS ao abrir o arquivo direto

Esse foi o que mais me travou. Eu abria o `index.html` com duplo clique e o console mostrava:

```
Requisição cross-origin bloqueada
Módulo fonte URI não é permitido neste documento
```

Nenhum `console.log` aparecia e eu achei que meu código estivesse errado — mas ele nem chegava a rodar.

O motivo: quando a página é aberta como `file:///`, o navegador bloqueia o carregamento de módulos por segurança. A solução foi servir a pasta por HTTP com `python3 -m http.server 8000` e acessar por `localhost`.

Aprendizado: **arquivo aberto** e **site servido** são coisas diferentes. Qualquer projeto com módulos ou `fetch` precisa de um servidor local.

### 4. Os ingredientes não vêm em uma lista

A TheMealDB não devolve os ingredientes em um array. Devolve vinte campos separados — `strIngredient1` até `strIngredient20` — mais outros vinte com as quantidades. E a maioria vem vazia: umas como `""`, outras como `null`.

Resolvi com um laço de 1 a 20, montando o nome do campo dinamicamente:

```js
const nomeIng = receita[`strIngredient${i}`];
```

Usei colchetes em vez de ponto porque o nome do campo só existe durante a execução. E filtrei os vazios com `if (nomeIng && nomeIng.trim() !== '')` — o primeiro teste barra `null`, o segundo barra string vazia.

No fim, `map` transforma cada ingrediente num `<li>` e `join('')` cola tudo numa string só. Sem o `join`, o array vira texto com vírgulas na tela.

### 5. A página quebrava quando a receita não existia

Busquei "arrabiatada" por engano e nada aconteceu. Quando a API não encontra nada, `meals` volta como `null` — e `dados.meals[0]` quebra, porque não dá para pegar a posição zero de algo que não é lista.

Tratei com uma verificação antes de usar o dado:

```js
if (!dados.meals) {
  resultado.innerHTML = '<p>Nenhuma receita encontrada.</p>';
  return;
}
```

Entendi também que "não encontrei a receita" e "a requisição falhou" são coisas diferentes. A primeira é resposta normal da API e é tratada com um `if`; a segunda é erro de verdade e fica no `catch`.

### 6. Esquecer de salvar o arquivo

Aconteceu duas vezes. Uma delas o `git commit` respondeu `nothing to commit, working tree clean` mesmo depois de eu ter mudado o código — porque o arquivo ainda não tinha sido salvo. O Git e o navegador leem o arquivo do disco, não o que está na tela do editor.

Agora Ctrl+S virou reflexo antes de testar ou commitar.