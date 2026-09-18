function RecipeCard({ nome, categoria }) {
  return (
    <div className="bg-zinc-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-zinc-100">{nome}</h2>
      <p className="text-sm text-emerald-400">{categoria}</p>
    </div>
  )
}

export default RecipeCard