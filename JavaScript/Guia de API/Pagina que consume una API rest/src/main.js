import response from "./mock/response.json";
import noReponse from "./mock/no-response.json.json";

const API_KEY = 122166861104007759;
const BASE_URL = `https://superheroapi.com/api/${API_KEY}/search/batman`;

let heroName = document.getElementById("name");
let show = document.getElementById("show");
const BTN_SRC = document.getElementById("search");

const responseHero = response.results;
const hasMovies = responseHero?.length;

BTN_SRC.addEventListener("click", () => {});
