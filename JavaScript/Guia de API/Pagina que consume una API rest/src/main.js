const API_KEY = 122166861104007759;
const BASE_URL = `https://superheroapi.com/api/${API_KEY}/search/`;

let heroName = document.getElementById("name");
let show = document.getElementById("showSection");
const BTN_SRC = document.getElementsByClassName("btn");
let heroNameValue = heroName.value;

const responseHero = response.results;

BTN_SRC.addEventListener("click", () => {
  responseHero.forEach(() => {
    fetch(BASE_URL + heroNameValue)
      .then((response) => response.json)
      .then((data) => console.log(data));
  });
});

const mostrarHeroe = () => {
  const div = document.createElement("div");
  div.classList.add("flex flex-col items-center m-5 bg-zinc-900 rounded-xl");
  div.innerHTML = `
  <div
        id="show"
        class="flex flex-col items-center m-5 bg-zinc-900 rounded-xl"
      >
        <div class="max-w-52 my-4">
          <img
            src="https://www.superherodb.com/pictures2/portraits/10/100/10441.jpg"
            alt="image"
            class="rounded-md"
          />
        </div>
        <div class="flex wrap space-x-7">
          <div class="ml-2">
            <h4>Name: Batman</h4>
            <h4>Real Name: Bruce Wayne</h4>
            <h4>Ciudad: Gotica</h4>
          </div>
          <div class="mr-2">
            <h4>Genero: Batman</h4>
            <h4>Raza: Bruce Wayne</h4>
            <h4>Ciudad: Gotica</h4>
          </div>
        </div>
      </div>
  `;
  show.append(div);
};
/*
 */
