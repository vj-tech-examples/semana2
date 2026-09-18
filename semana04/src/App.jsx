import RecipeCard from './RecipeCard'

function App() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-emerald-400">Buscador de receitas</h1>
      <RecipeCard nome="Frango assado" categoria="Chicken" />
      <RecipeCard nome="Lasanha" categoria="Pasta" />
      <RecipeCard nome="Panqueca" categoria="Dessert" />
    </div>
  )
}

export default App