//---------Variables
const listaTweets = document.getElementById("lista-tweets");

//--------Event Listeners
eventListeners();

function eventListeners() {
  //cuando se envia el formulario
  document.querySelector("#formulario").addEventListener("submit", agregarTweet);
  // Borrar tweets
  listaTweets.addEventListener("click", borrarTweet);
  // Contenido Cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

//------ Funciones

// Añadir tweet del formulario
function agregarTweet(e) {
  e.preventDefault();
  console.log("Formulario enviado");
  // leer el valor de textarea
  const tweet = document.getElementById("tweet").value;
  // Crear boton de eliminar tweet
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";
  // Crear elemento y añadir el contenido a la lista
  const li = document.createElement("li");
  li.innerText = tweet;
  // Añade Boton de borrar al tweet
  li.appendChild(botonBorrar);
  // Añade el tweet a la lista
  listaTweets.appendChild(li);
  // Añadir a local storage
  agregarTweetLocalStorage(tweet);
}
// Eliminar tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetlocalStorage(e.target.parentElement.innerText);
  }
}
// Mostrar local storage en la lista
function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet) {
    // Crear boton de eliminar tweet
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";
    // Crear elemento y añadir el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;
    // Añade Boton de borrar al tweet
    li.appendChild(botonBorrar);
    // Añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}
//Agrega Tweet a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  // Añadit nuevo tweet
  tweets.push(tweet);
  // Converitr de string a arreglo
  localStorage.setItem("tweets", JSON.stringify(tweets));
  // Agregar a local storage
}
// Comprobar que haya elementos en localStorage, Retorna arreglo
function obtenerTweetsLocalStorage() {
  let tweets;
  // Revisando los values de local storage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

// Eliminar tweet de local storage
function borrarTweetlocalStorage(tweet) {
  let tweets, tweetBorrar;
  // Elimina la X del tweets
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });
  localStorage.setItem("tweets", JSON.stringify(tweets));
}
