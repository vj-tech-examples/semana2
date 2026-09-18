import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'

function App() {
  const [receitas, setReceitas] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    async function buscar() {
      const resposta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${busca}`)
      const dados = await resposta.json()
      setReceitas(dados.meals ?? [])
    }
    buscar()
  }, [busca])

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <h1 className="text-4xl font-bold text-emerald-400 mb-6">Buscador de receitas</h1>

      <input
        value={busca}
        onChange={e => setBusca(e.target.value)}
        placeholder="Buscar receita..."
        className="w-full max-w-md bg-zinc-800 text-zinc-100 rounded-lg p-3 mb-8"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {receitas.map(receita => (
          <RecipeCard
            key={receita.idMeal}
            nome={receita.strMeal}
            categoria={receita.strCategory}
          />
        ))}
      </div>
    </div>
  )
}

export default App