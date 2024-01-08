//ASI ES COMO FUNCIONA UNA FUNCION
function saludar({ name, age }: { name: string; age: number }): string {
  console.log(`Hola ${name}, tienes ${age}`);

  return name;
}
//PODEMOS ASIGNAR A UNA VARIABLE UNA FUNCION
let nombre = saludar({ name: "pepe", age: 2 });

// DE ESTA FORMA PODEMOS EJECUTAR FUNCIONES DENTRO DE FUNNCIONES
const sayHiFromFunction = (fn: (name: string) => void) => {
  fn("miguel");
};
const sayHi = (name: string) => {
  console.log(`Hola ${name}`);
};
sayHiFromFunction(sayHi);

//INFERENCIA DE FUNCIONES ANONIMAS SEGUN EL CONTEXTO
const vengadores = ["IronMan", "Hulk", "Thor"];

// for(let i = 0; i < arr.length ; i++){
//   failureItems[i] = `<li class="text-warning">${arr[i]}</li>`;
// }

vengadores.forEach((vengador) => {
  console.log(vengador.toUpperCase);
});
vengadores.length;
//OBJETOS Y TIPOS PROPIOS
type Hero = {
  //CREAMOS NUESTRO PROPIO TIPO
  readonly id?: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  age: number;
  isActive?: boolean;
};

let hero: Hero = {
  //CREAMOS UN HEROE
  name: "Thor",
  age: 1500,
};

const crearHeroe = (name: string, age: number): Hero => {
  //FUNCION QUE CREA HEROES
  return { id: crypto.randomUUID(), name, age, isActive: true };
};

let spiderman = crearHeroe("Sipderman", 26);

//ARREGLOS Y MATRICES CON TUPLAS

type cellvalue = "X" | "O" | "";
//ESTO ES UN TUPLA: UN ARRAY FIJO EN LONGITUD
const board: [
  [cellvalue, cellvalue, cellvalue],
  [cellvalue, cellvalue, cellvalue],
  [cellvalue, cellvalue, cellvalue]
] = [
  ["X", "X", "X"],
  ["", "", ""],
  ["", "", ""],
];
