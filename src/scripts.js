document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openButton = document.getElementById("openModal");
    const closeButton = document.getElementById("closeModal");
  
    // Função para abrir o modal
    openButton.addEventListener("click", function () {
      modal.classList.remove("hidden");
    });
  
    // Função para fechar o modal ao clicar no botão de fechar (×)
    closeButton.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  
    // Função para fechar o modal ao clicar fora da área do modal
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.add("hidden");
      }
    });
});

function checkMaxLength(input, maxLength) {
  if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
  }
}

function capitalizeFirstLetter(input) {
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
}

function updateCharCount(textarea, counterId) {
  const charCount = textarea.value.length;
  document.getElementById(counterId).textContent = `${charCount} / 1000 caracteres`;
}