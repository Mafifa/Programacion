//PRODUCTOS
class Producto {
  constructor() {
    this.Codigo = "";
    this.Cuota = 0.0;
    this.CantidadVendida = 0;
  }
}

//CAPACITACION
class Capacitacion {
  constructor() {
    this.Curso = "";
    this.Horas = 0;
    this.Institucion = "";
    this.Costo = 0.0;
  }
}

//VENDEDOR
class Vendedor {
  constructor() {
    this.Nombre = "";
    this.Cedula = 0;
    this.Direccion = "";
    this.Correo = "";
    this.CantidadCursos = 0;
    this.Producto = Array(10).fill(new Producto());
    this.Capacitacion = Array(5).fill(new Capacitacion());
  }
}

// Funcion para pedir numeros positivos
function MenoresCero(num) {
  do {
    if (num < 0) {
      console.log("Numero no valido. Ingresar otro: ");
    }
  } while (num < 0);
  return num;
}

// Funcion para cargar los datos
function CargarDatos(Vendedores) {
  console.log("Ingresando datos para informacion");
  console.log("Nombre del vendedor: ");
  Vendedores.Nombre = prompt();

  console.log("Cedula: ");
  Vendedores.Cedula = parseInt(prompt());

  console.log("Direccion: ");
  Vendedores.Direccion = prompt();

  console.log("Correo: ");
  Vendedores.Correo = prompt();

  console.log("Cantidad de Cursos  (Solo de 3 a 5 Cursos): ");
  do {
    Vendedores.CantidadCursos = parseInt(prompt());
  } while (Vendedores.CantidadCursos < 3 || Vendedores.CantidadCursos > 5);

  console.log("Ingresando datos para los productos");
  for (let i = 0; i < 10; i++) {
    console.log("Codigo: ");
    Vendedores.Producto[i].Codigo = prompt();

    console.log("Cantidad: ");
    Vendedores.Producto[i].CantidadVendida = MenoresCero(parseInt(prompt()));

    console.log("Cuota: ");
    Vendedores.Producto[i].Cuota = MenoresCero(parseFloat(prompt()));
  }

  for (let j = 0; j < 5; j++) {
    console.log("Nombre del curso: ");
    Vendedores.Capacitacion[j].Curso = prompt();

    console.log("Cantidad de horas del curso: ");
    Vendedores.Capacitacion[j].Horas = MenoresCero(parseInt(prompt()));

    console.log("Nombre de la institucion: ");
    Vendedores.Capacitacion[j].Institucion = prompt();

    console.log("Costo del curso en Bs: ");
    Vendedores.Capacitacion[j].Costo = MenoresCero(parseFloat(prompt()));
  }
}

// Funcion para ver cual producto no cumple con la cuota
function MostrarProductoSinCuota(Vendedores) {
  console.log(
    `Producto sin cubrir la cuota para el vendedor ${Vendedores.Nombre}:`
  );
  for (let i = 0; i < 10; i++) {
    if (Vendedores.Producto[i].CantidadVendida < Vendedores.Producto[i].Cuota) {
      console.log(
        `El producto: ${Vendedores.Producto[i].Codigo} no cumple la cuota`
      );
    }
  }
}

// Funcion para encontrar al vendedor con mas dinero invertido en cursos
function MasInversionCursos(Vendedores) {
  let inversionTotal = 0.0;
  let mayorInversion = 0.0;
  let vendedorIndice = 0;

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < Vendedores[i].CantidadCursos; j++) {
      inversionTotal += Vendedores[i].Capacitacion[j].Costo;
    }
    if (inversionTotal > mayorInversion) {
      mayorInversion = inversionTotal;
      vendedorIndice = i;
    }
  }
  console.log(
    `El vendedor con mayor inversion en cursos es ${Vendedores[vendedorIndice].Nombre}`
  );
  console.log(`Con una cantidad de dinero invertida de: ${mayorInversion}`);
}

// Funcion para encontrar el producto mas vendido
function ProductoMasVendido(Vendedores) {
  let IndiceProducto = 0;
  let IndiceVendedor = 0;
  let CantidadMayor = 0;

  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      if (Vendedores[i].Producto[j].CantidadVendida > CantidadMayor) {
        CantidadMayor = Vendedores[i].Producto[j].CantidadVendida;
        IndiceVendedor = i;
        IndiceProducto = j;
      }
    }
  }
  console.log(
    `El producto mas vendido es: ${Vendedores[IndiceVendedor].Producto[IndiceProducto].Codigo}`
  );
}

// Funcion para buscar curso por nombre
function MostrarInfoCurso(vendedores, opc) {
  console.log(`Instituciones que ofrecen el curso ${opc} y su costo`);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < vendedores[i].CantidadCursos; j++) {
      if (vendedores[i].Capacitacion[j].Curso === opc) {
        console.log(`Vendedor: ${vendedores[i].Nombre}`);
        console.log(
          `Institucion: ${vendedores[i].Capacitacion[j].Institucion}`
        );
        console.log(`Costo: ${vendedores[i].Capacitacion[j].Costo}`);
      }
    }
  }
}

function main() {
  let Vendedores = Array(20).fill(new Vendedor());
  let opc;

  for (let i = 0; i < 20; i++) CargarDatos(Vendedores[i]);

  // Llamada a las funciones creadas
  for (let i = 0; i < 20; i++) MostrarProductoSinCuota(Vendedores[i]);

  ProductoMasVendido(Vendedores);

  MasInversionCursos(Vendedores);

  console.log("Buscar curso por nombre");
  do {
    console.log(
      "Escriba el nombre del curso a buscar o escriba '0' para salir"
    );
    opc = prompt();
    if (opc !== "0") {
      MostrarInfoCurso(Vendedores, opc);
    }
  } while (opc === "0");
}

main();
