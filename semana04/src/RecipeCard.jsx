function RecipeCard({ nome, categoria }) {
  return (
    <div>
      <h2>{nome}</h2>
      <p>{categoria}</p>
    </div>
  )
}

export default RecipeCard