# Mini-app de receitas — Semana 05

App em Next.js com login e CRUD de receitas. Cada usuário entra com e-mail e senha e gerencia a própria lista: criar, listar, editar e apagar. Os dados ficam no Cloud Firestore.

## Tecnologias

- Next.js (App Router)
- Firebase Authentication (e-mail/senha)
- Cloud Firestore
- Tailwind CSS

## Como rodar

```bash
cd semana05
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:3000`).

Antes de rodar, crie um arquivo `.env.local` na raiz do projeto com as chaves do seu projeto Firebase. Os nomes das variáveis estão em `.env.example`.

## Estrutura

- `src/app/page.js` — página inicial: lista as receitas do usuário, com edição e exclusão
- `src/app/login/page.js` — tela de login e criação de conta
- `src/app/nova/page.js` — formulário de nova receita
- `src/app/layout.js` — layout comum, com o menu de navegação
- `src/app/useUsuario.js` — hook que informa quem está logado
- `src/services/receitas.js` — todo o acesso ao Firestore
- `src/lib/firebase.js` — inicialização do Firebase

No App Router do Next, cada pasta dentro de `src/app` vira uma rota: `page.js` na raiz é `/`, `login/page.js` é `/login`, e `nova/page.js` é `/nova`.

## Como funciona

O fluxo é sempre **tela → service → Firestore → tela**:

1. A página abre. O hook `useUsuario` começa a escutar o Firebase Auth e, enquanto não há resposta, a tela mostra "Carregando...".
2. Quando o Firebase informa quem está logado, o `useEffect` dispara. Ele depende de `[usuario]`, e não de `[]`, porque a busca precisa do uid — que só existe depois dessa resposta.
3. O efeito chama `listarReceitas(uid)`, que está no service.
4. O service monta uma consulta na coleção `receitas` filtrando por `where('uid', '==', uid)`, busca no Firestore e devolve uma lista com o id de cada documento junto com os campos.
5. O resultado é guardado no estado com `setReceitas`.
6. Como o estado mudou, o React redesenha a tela e o `.map()` monta os cartões.

Criar, editar e apagar seguem o mesmo caminho: a tela chama a função correspondente do service (`criarReceita`, `atualizarReceita`, `apagarReceita`) e depois recarrega a lista, para o que aparece na tela refletir o que está no banco.

O ponto do padrão `services/` é que nenhuma tela importa `firebase/firestore`. Elas conhecem apenas as quatro funções do service. Se o banco mudasse, só esse arquivo mudaria.

O id de cada documento é gerado pelo Firestore e vem junto na listagem. É ele que permite dizer qual documento editar ou apagar.

## Onde usei "use client" e por quê

No Next.js, os componentes rodam no servidor por padrão: o framework executa o código, gera o HTML e envia o resultado pronto. Mas no servidor não existe clique nem digitação, então `useState`, `useEffect` e eventos como `onClick` não funcionam lá.

A diretiva `'use client'` marca o arquivo para rodar no navegador. Usei nas três páginas que têm estado e interação:

- `src/app/page.js` — estado da lista, edição em linha e botões
- `src/app/login/page.js` — campos controlados e botões
- `src/app/nova/page.js` — formulário
- `src/app/useUsuario.js` — usa `useState` e `useEffect`

O `layout.js` não tem a diretiva, porque só desenha o menu e não tem interação. Ao remover a linha da página inicial, o Next para com um erro dizendo que esses hooks só existem em componentes de cliente.

## Segurança das chaves

As chaves do Firebase ficam em `.env.local`, que não é versionado. Elas usam o prefixo `NEXT_PUBLIC_` porque precisam estar disponíveis no navegador — é de lá que o app conversa com o Firebase.

Vale registrar que essas chaves não são segredo: elas identificam o projeto e são visíveis para qualquer visitante. O que protege os dados são as regras de segurança do Firestore.

## Dificuldades que enfrentei

**Entender quando o `useEffect` deve rodar.** Com `[]` nas dependências, a busca rodava uma vez só, na primeira renderização — e nesse momento o Firebase ainda não tinha dito quem estava logado, então não havia uid. A lista ficava vazia para sempre. Trocando para `[usuario]`, o efeito roda de novo quando o usuário deixa de ser nulo, e aí sim busca.

**Componentes de servidor e de cliente.** Foi a diferença mais nova em relação ao React puro da semana anterior. Entendi de fato quando removi o `'use client'` da página inicial e vi o erro do Next explicando que hooks não funcionam no servidor.

**Separar a tela do banco.** No começo seria mais direto chamar o Firestore dentro da página. Isolar tudo em `src/services/receitas.js` deu um arquivo a mais, mas deixou as telas sem nenhuma referência ao Firebase.

**Três arquivos com o mesmo nome.** Com `page.js` na raiz, em `login/` e em `nova/`, colei código no arquivo errado mais de uma vez. Passei a conferir o caminho na barra do topo do editor antes de editar.
