const getList = async () => {
  let url = 'http://127.0.0.1:5000/filmes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.filmes.forEach(item => insertList(item.nome, item.ano, item.resumo, item.imageUrl))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const openButton = document.getElementById("openModal");
    const closeButton = document.getElementById("closeModal");
  
    openButton.addEventListener("click", function () {
      modal.classList.remove("hidden");
    });
  
    closeButton.addEventListener("click", function () {
      modal.classList.add("hidden");
    });
  
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
  document.getElementById(counterId).textContent = `${charCount} / 350 caracteres`;
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  toast.style.display = "block";
  toast.style.animation = "showToast 2s ease-out";

  setTimeout(function() {
    toast.style.animation = "hideToast 2s ease-in";
    setTimeout(() => {
      toast.style.display = "none";
      toast.style.animation = "";
    }, 2000);
  }, 4500);
}

const postItem = async (inputName, inputYear, inputResume, inputImageUrl) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('ano', inputYear);
  formData.append('resumo', inputResume);
  formData.append('imageUrl', inputImageUrl);

  let url = 'http://127.0.0.1:5000/filme';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/filme?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

const newItem = async () => {
  let inputName = document.getElementById("newName").value;
  let inputYear = document.getElementById("newYear").value;
  let inputImageUrl = document.getElementById("newImageUrl").value;
  let inputResume = document.getElementById("newResume").value;

  const isDuplicate = await checkDuplicate(inputName);

  if (inputName === '') {
    showToast("Escreva o nome do filme!");
  } else if (isDuplicate) {
    showToast("Já existe um filme com esse nome!");
  } else if (isNaN(inputYear) || inputYear.length < 4) {
    showToast("O ano precisa ser um número com pelo menos 4 dígitos!");
  } else if (inputResume === '' || inputResume.length > 350) {
    showToast("O resumo do filme não pode ficar vazio e deve ter no máximo 350 caracteres!");
  } else if (inputImageUrl === '' || !isValidUrl(inputImageUrl)) {
    showToast("A URL da imagem não pode ficar vazia e precisa ser uma URL válida!");
  } else {
    postItem(inputName, inputYear, inputResume, inputImageUrl);
    insertList(inputName, inputYear, inputImageUrl, inputResume);
    showToast("Filme adicionado!");
  }
}

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

const checkDuplicate = async (name) => {
  const url = `http://127.0.0.1:5000/filmes`;
  const response = await fetch(url, {
    method: 'get',
  });
  const data = await response.json();

  const duplicate = data.filmes.some(filme => filme.nome === name);

  return duplicate;
};

const openEditModal = (nome, ano, resumo, imageUrl) => {
  document.getElementById("newName").value = nome;
  document.getElementById("newYear").value = ano;
  document.getElementById("newResume").value = resumo;
  document.getElementById("newImageUrl").value = imageUrl;

  updateCharCount(document.getElementById("newResume"), "charCount");

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
};

const insertList = (nome, ano, resumo, imageUrl) => {
  var myList = document.getElementById('myList');
  var card = document.createElement('div');
  card.className = 'movie-card';

  var image = document.createElement('img');
  image.src = imageUrl;
  image.alt = nome;
  var imagemElement = document.createElement('div');
  imagemElement.appendChild(image);
  card.appendChild(imagemElement);

  var closeButton = document.createElement('div');
  closeButton.className = 'close-container';
  closeButton.innerHTML = '<span class="close">&times;</span>';
  closeButton.addEventListener('click', function () {
    if (confirm('Você tem certeza?')) {
      card.remove();
      deleteItem(nome);
      alert('Removido!');
    }
  });
  card.appendChild(closeButton);

  var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '<span class="edit">✎</span>';
    editButton.addEventListener('click', function () {
        openEditModal(nome, ano, resumo, imageUrl);
    });
  card.appendChild(editButton);

  var overlay = document.createElement('div');
  overlay.className = 'overlay';
  
  var overlayContent = document.createElement('div');
  overlayContent.className = 'overlayContent';
  overlayContent.innerHTML = `<h2>${ano}</h2><h1>${nome}</h1><p>${resumo}</p>`;
  overlay.appendChild(overlayContent);

  card.appendChild(overlay);

  myList.appendChild(card);

  document.getElementById('newName').value = '';
  document.getElementById('newYear').value = '';
  document.getElementById('newResume').value = '';
  document.getElementById('newImageUrl').value = '';

  removeElement();
};

getList()