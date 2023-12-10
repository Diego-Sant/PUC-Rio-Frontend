let filmesLoaded = false;
let artistasLoaded = false;

const getList = async () => {
  if (!filmesLoaded) {
    let url = 'http://127.0.0.1:5000/filmes';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.filmes.forEach(item => insertList(item.nome, item.ano, item.resumo, item.imageUrl))
        filmesLoaded = true;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

const getArtist = async () => {
  if (!artistasLoaded) {
    let url = 'http://127.0.0.1:5000/artistas';
    fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        data.artistas.forEach(item => insertListArtista(item.nome, item.idade, item.imageUrl))
        artistasLoaded = true;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
}

{/* ------------------------------------------------------------------------------------------------ */}

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const openButton = document.getElementById("openModal");
  const closeButton = document.getElementById("closeModal");

  openButton.addEventListener("click", function (event) {
      if (event.target.id === "openModal") {
          document.getElementById("newName").value = '';
          document.getElementById("newYear").value = '';
          document.getElementById("newResume").value = '';
          document.getElementById("newImageUrl").value = '';
      }

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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modalArtista");
  const openButton = document.getElementById("openModalArtista");
  const closeButton = document.getElementById("closeModalArtista");

  openButton.addEventListener("click", function (event) {
      if (event.target.id === "openModalArtista") {
          document.getElementById("newNameArtista").value = '';
          document.getElementById("newAgeArtista").value = '';
          document.getElementById("newImageUrlArtista").value = '';
      }

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

{/* ------------------------------------------------------------------------------------------------ */}

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

{/* ------------------------------------------------------------------------------------------------ */}

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

function showToastArtista(message) {
  const toast = document.getElementById("toastArtista");

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

{/* ------------------------------------------------------------------------------------------------ */}

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

const postItemArtista = async (inputName, inputAge, inputImageUrl) => {
  const formData = new FormData();
  formData.append('nome', inputName);
  formData.append('idade', inputAge);
  formData.append('imageUrl', inputImageUrl);

  let url = 'http://127.0.0.1:5000/artista';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

{/* ------------------------------------------------------------------------------------------------ */}

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

const deleteItemArtista = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/artista?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

{/* ------------------------------------------------------------------------------------------------ */}

const newItem = async () => {
  let inputName = document.getElementById("newName").value;
  let inputYear = document.getElementById("newYear").value;
  let inputResume = document.getElementById("newResume").value;
  let inputImageUrl = document.getElementById("newImageUrl").value;

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
    insertList(inputName, inputYear, inputResume, inputImageUrl);
    alert("Filme adicionado!");
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

const newItemArtista = async () => {
  let inputName = document.getElementById("newNameArtista").value;
  let inputAge = document.getElementById("newAgeArtista").value;
  let inputImageUrl = document.getElementById("newImageUrlArtista").value;

  const isDuplicate = await checkDuplicateArtista(inputName);

  if (inputName === '') {
    showToastArtista("Escreva o nome do artista!");
  } else if (isDuplicate) {
    showToastArtista("Já existe um artista com esse nome!");
  } else if (isNaN(inputAge) || inputAge.length > 3 || inputAge === '') {
    showToastArtista("O campo do ano precisa ter pelo menos 3 números!");
  } else if (inputImageUrl === '' || !isValidUrl(inputImageUrl)) {
    showToastArtista("A URL da imagem não pode ficar vazia e precisa ser uma URL válida!");
  } else {
    postItemArtista(inputName, inputAge, inputImageUrl);
    insertListArtista(inputName, inputAge, inputImageUrl);
    alert("Artista adicionado!");
  }
}

const checkDuplicateArtista = async (name) => {
  const url = `http://127.0.0.1:5000/artistas`;
  const response = await fetch(url, {
    method: 'get',
  });
  const data = await response.json();

  const duplicate = data.artistas.some(artistas => artistas.nome === name);

  return duplicate;
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

{/* ------------------------------------------------------------------------------------------------ */}

const openEditModal = (nome, ano, resumo, imageUrl) => {
  document.getElementById("newName").value = nome;
  document.getElementById("newYear").value = ano;
  document.getElementById("newResume").value = resumo;
  document.getElementById("newImageUrl").value = imageUrl;

  updateCharCount(document.getElementById("newResume"), "charCount");

  const modal = document.getElementById("modal");
  modal.classList.remove("hidden");
};

const openEditModalArtista = (nome, idade, imageUrl) => {
  document.getElementById("newNameArtista").value = nome;
  document.getElementById("newAgeArtista").value = idade;
  document.getElementById("newImageUrlArtista").value = imageUrl;

  const modal = document.getElementById("modalArtista");
  modal.classList.remove("hidden");
};

{/* ------------------------------------------------------------------------------------------------ */}

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

const insertListArtista = (nome, idade, imageUrl) => {
  var myList = document.getElementById('myListArtista');
  var card = document.createElement('div');
  card.className = 'artist-card';

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
      deleteItemArtista(nome);
      alert('Removido!');
    }
  });
  card.appendChild(closeButton);

  var editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.innerHTML = '<span class="edit">✎</span>';
    editButton.addEventListener('click', function () {
        openEditModalArtista(nome, idade, imageUrl);
    });
  card.appendChild(editButton);

  var overlay = document.createElement('div');
  overlay.className = 'overlayArtista';
  
  var overlayContent = document.createElement('div');
  overlayContent.className = 'overlayContentArtista';
  overlayContent.innerHTML = `<h2>${idade}</h2><h1>${nome}</h1>`;
  overlay.appendChild(overlayContent);

  card.appendChild(overlay);

  myList.appendChild(card);

  document.getElementById('newNameArtista').value = '';
  document.getElementById('newAgeArtista').value = '';
  document.getElementById('newImageUrlArtista').value = '';

  removeElement();
};

if (!filmesLoaded) {
  getList();
}

if (!artistasLoaded) {
  getArtist();
}