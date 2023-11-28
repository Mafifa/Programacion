const MaxAtletas = 30;
const MaxJueces = 9;

// Estructura para la información de los jueces
class Juez {
  constructor() {
    this.nombre = "";
    this.pais = "";
    this.puntaje = 0;
  }
}

// Estructura para la información de los saltos de un atleta
class Salto {
  constructor() {
    this.dificultad = ""; // A, B, C o D
    this.puntaje = 0;
  }
}

// Estructura para la información de un atleta
class Atleta {
  constructor() {
    this.pais = "";
    this.nombre = "";
    this.edad = 0;
    this.intentos = [new Salto(), new Salto(), new Salto()];
    this.puntajeTotal = 0;
  }
}

// Función para cargar la información de un atleta
function cargarAtleta(atleta) {
  atleta.pais = prompt("Ingrese el país del atleta:");
  atleta.nombre = prompt("Ingrese el nombre del atleta:");
  atleta.edad = parseInt(prompt("Ingrese la edad del atleta:"));

  for (let i = 0; i < 3; i++) {
    console.log(`Salto #${i + 1}:`);
    atleta.intentos[i].dificultad = prompt(
      "Dificultad del salto (A, B, C o D):"
    );
    atleta.intentos[i].puntaje = parseFloat(
      prompt("Puntaje otorgado (0 a 10):")
    );
  }
}

// Función para calcular el puntaje total de un atleta
function calcularPuntaje(atleta) {
  const puntajes = atleta.intentos.map((salto) => salto.puntaje);

  // Eliminar el puntaje más alto y el puntaje más bajo
  const minPuntaje = Math.min(...puntajes);
  const maxPuntaje = Math.max(...puntajes);

  const minIndex = puntajes.indexOf(minPuntaje);
  const maxIndex = puntajes.indexOf(maxPuntaje);

  puntajes[minIndex] = 0; // Eliminar el puntaje más bajo
  puntajes[maxIndex] = 0; // Eliminar el puntaje más alto

  // Calcular el puntaje total
  let puntajeTotal = puntajes.reduce((total, puntaje) => total + puntaje, 0);

  // Multiplicar por el grado de dificultad
  switch (atleta.intentos[0].dificultad) {
    case "A":
      puntajeTotal *= 0.45;
      break;
    case "B":
      puntajeTotal *= 0.7;
      break;
    case "C":
      puntajeTotal *= 0.85;
      break;
    case "D":
      puntajeTotal *= 1.2;
      break;
    default:
      console.log("Dificultad no válida.");
      return;
  }

  atleta.puntajeTotal = puntajeTotal;
}

// Función para mostrar atletas que no realizaron saltos con dificultad B
function mostrarAtletasSinSaltoBDificultad(atletas, numAtletas) {
  console.log("Atletas que no realizaron saltos con dificultad B:");
  for (let i = 0; i < numAtletas; i++) {
    const tieneSaltoBDificultad = atletas[i].intentos.every(
      (salto) => salto.dificultad !== "B"
    );

    if (!tieneSaltoBDificultad) {
      console.log(`Nombre: ${atletas[i].nombre}, País: ${atletas[i].pais}`);
    }
  }
}

// Función para mostrar jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto
function mostrarJuecesPuntajeMayor(atletas, jueces, numAtletas, numJueces) {
  console.log(
    "Jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto:"
  );
  for (let i = 0; i < numAtletas; i++) {
    for (let j = 0; j < numJueces; j++) {
      if (
        atletas[i].pais === jueces[j].pais &&
        atletas[i].intentos[0].puntaje > 8.75
      ) {
        console.log(
          `Nombre del Juez: ${jueces[j].nombre}, País del Juez: ${jueces[j].pais}`
        );
      }
    }
  }
}

// Función principal
function main() {
  const cantidadAtletas = parseInt(
    prompt("Ingrese cantidad de atletas (máximo 30):")
  );
  const cantidadJueces = parseInt(
    prompt("Ingrese cantidad de jueces (máximo 9):")
  );

  if (
    cantidadAtletas < 0 ||
    cantidadAtletas > 30 ||
    cantidadJueces < 0 ||
    cantidadJueces > 9
  ) {
    console.log("Ingrese una cantidad válida.");
    return;
  }

  const atletas = Array.from({ length: MaxAtletas }, () => new Atleta());
  const jueces = Array.from({ length: MaxJueces }, () => new Juez());

  // Cargar información de los atletas
  for (let i = 0; i < cantidadAtletas; i++) {
    console.log(`Datos del atleta #${i + 1}:`);
    cargarAtleta(atletas[i]);
    calcularPuntaje(atletas[i]);
    console.log("------------------------------------");
  }

  // Cargar información de los jueces
  for (let i = 0; i < cantidadJueces; i++) {
    console.log(`Datos del juez #${i + 1}:`);
    jueces[i].nombre = prompt("Ingrese el nombre del juez:");
    jueces[i].pais = prompt("Ingrese el país del juez:");
    jueces[i].puntaje = parseFloat(
      prompt("Ingrese el puntaje otorgado por el juez (0 a 10):")
    );
    console.log("------------------------------------");
  }

  // Ejemplo de uso de funciones
  mostrarAtletasSinSaltoBDificultad(atletas, cantidadAtletas);
  console.log("------------------------------------");
  mostrarJuecesPuntajeMayor(atletas, jueces, cantidadAtletas, cantidadJueces);
}

// Llamar a la función principal
main();
