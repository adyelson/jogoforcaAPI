
const getDataCat = () =>
fetch("http://localhost:3000/categorias")
  .then((response) => response.json())
  .catch((err) => console.error(err));

const getDataWord = () =>
  fetch("http://localhost:3000/palavras")
    .then((response) => response.json())
    .catch((err) => console.error(err)); 
  
const postDataCat = (novaSubmissao) =>
fetch(`http://localhost:3000/categorias`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(novaSubmissao),
})
  .then((response) => response.json())
  .catch((err) => console.error(err));

const postDataWord = (novaSubmissao) =>
  fetch(`http://localhost:3000/palavras`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaSubmissao),
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));

const addListItem = (item, element) => {
  const optEl = document.createElement("option");
  optEl.setAttribute('value', item.id);
  // optEl.addEventoptstener('click', deleteFromApi)
  optEl.innerText = `${item.nome}`;
  element.appendChild(optEl);
} 
const onSubmitWord = (event) => {
  event.preventDefault();
  const ulEl = document.querySelector(".main .categorias");
  

  if (ulEl) {
    const submitedValue = {
      palavra: event.target.nome.value,
      categoriaId: event.target.categorias.value,          
    };
    // Trabalhando com promises sem uso do async/await
    postDataWord(submitedValue).then((novaSubmissao) => {
      alert(`${submitedValue.palavra} adicionado às palavras.`)
    });
  }
};

const onSubmitCat = (event) => {
  event.preventDefault();
  const ulEl = document.querySelector(".main .categorias");
  console.log(ulEl);

  if (ulEl) {
    const submitedValue = {
      nome: event.target.nome.value,        
    };      
    // Trabalhando com promises sem uso do async/await
    postDataCat(submitedValue).then((novaSubmissao) => {
      addListItem(novaSubmissao, ulEl);
      alert(`${submitedValue.nome} adicionado às categorias.`)
    });
  }
};

const addSubmits = async (ulEl) => {
  // Trabalhando com promises usando async/await
  const result = await getDataCat();

  // Se result existir e tiver elementos no array
  if (result && result.length)  result.forEach((item) => addListItem(item, ulEl));
}

const randomWord = async (gameWordEl) =>{
  const palavras = await getDataWord();
  const categorias = await getDataCat();
  console.log(categorias);
  let random = Math.floor(Math.random() * palavras.length);
  gameWordEl.innerHTML = `<p>${palavras[random].palavra}</p> <p>${categorias[palavras[random].categoriaId-1].nome}</p>`;
   
 

}

const onLoad = () => {
const ulEl = document.querySelector(".main .categorias");
 const formElword = document.querySelector(".new-word");
 const formElcat = document.querySelector(".new-category");
 const gameWordEl = document.querySelector('.palavra-jogo');

 // verifica o elemento buscado
 if (formElword) formElword.addEventListener('submit', onSubmitWord);
 if (formElcat) formElcat.addEventListener('submit', onSubmitCat);
 if (ulEl) addSubmits(ulEl);
 if (gameWordEl) randomWord(gameWordEl);
 // remove evento do documento
 document.removeEventListener('DOMContentLoaded', onLoad);
};


document.addEventListener('DOMContentLoaded', onLoad);