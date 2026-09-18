import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'

function App() {
  const [receitas, setReceitas] = useState([])

  useEffect(() => {
    async function buscar() {
      const resposta = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken')
      const dados = await resposta.json()
      setReceitas(dados.meals)
    }
    buscar()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold text-emerald-400">Buscador de receitas</h1>
      {receitas.map(receita => (
        <RecipeCard
          key={receita.idMeal}
          nome={receita.strMeal}
          categoria={receita.strCategory}
        />
      ))}
    </div>
  )
}

export default App