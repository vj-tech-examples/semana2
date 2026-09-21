function RecipeCard({ nome, categoria, foto }) {
  return (
    <div className="bg-zinc-800 rounded-xl overflow-hidden">
      <img src={foto} alt={nome} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-zinc-100">{nome}</h2>
        <p className="text-sm text-emerald-400">{categoria}</p>
      </div>
    </div>
  )
}

export default RecipeCard