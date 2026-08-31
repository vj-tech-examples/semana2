const ingredientes = document.querySelectorAll("#ingredientes li");

ingredientes.forEach((ingrediente) => {
  ingrediente.addEventListener("click", () => {
    ingrediente.classList.toggle("feito");
  });
});
