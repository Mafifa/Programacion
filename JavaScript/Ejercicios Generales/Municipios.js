const MAX_MUNICIPIOS = 21;
const MAX_SECTORES = 10;

class Sectores {
  constructor() {
    this.nomberSector = "";
    this.cantidadHombres = 0;
    this.cantidadMujeres = 0;
    this.presupuestoAnual = 0.0;
  }
}

class Municipio {
  constructor() {
    this.ciudadCapital = "";
    this.nombreAlcalde = "";
    this.fechaFundacion = "";
    this.cantidadSectores = 0;
    this.sectores = Array(MAX_SECTORES).fill(new Sectores());
  }
}

function MenosCero(n) {
  do {
    if (n < 0) {
      console.log("Ingrese un número positivo por favor: ");
      n = parseFloat(prompt());
    }
  } while (n < 0);
  return n;
}

function CargarMunicipios(Anzoategui) {
  console.log("Ingrese nombre del municipio: ");
  Anzoategui.ciudadCapital = prompt();

  console.log("Ingrese Nombre del alcalde: ");
  Anzoategui.nombreAlcalde = prompt();

  console.log("Ingrese fecha de fundación en formato DD/MM/AA");
  Anzoategui.fechaFundacion = prompt();

  let cantidadSectores = Anzoategui.cantidadSectores;

  console.log("Ahora se cargarán los sectores del municipio :");
  for (let i = 0; i < cantidadSectores; i++) {
    console.log("Ingrese nombre del sector: ");
    Anzoategui.sectores[i].nomberSector = prompt();

    console.log("Ingrese cantidad de hombres: ");
    Anzoategui.sectores[i].cantidadHombres = parseInt(prompt());

    console.log("Ingrese cantidad de mujeres en el sector");
    Anzoategui.sectores[i].cantidadMujeres = parseInt(prompt());

    console.log("Ingrese presupuesto anual del sector");
    Anzoategui.sectores[i].presupuestoAnual = parseFloat(prompt());
  }
}

function PresupuestoPorMunicipio(Anzoategui, cantidadMunicipios) {
  let presupuestoTotalEstatal = 0.0;
  let Porcentaje;

  for (let i = 0; i < cantidadMunicipios; i++) {
    let presupuestoTotalDelMunicipio = 0.0;
    for (let j = 0; j < Anzoategui[i].cantidadSectores; j++) {
      presupuestoTotalDelMunicipio +=
        Anzoategui[i].sectores[j].presupuestoAnual;
      presupuestoTotalEstatal += presupuestoTotalDelMunicipio;
    }
    for (let i = 0; i < cantidadMunicipios; i++) {
      let presupuestoTotalDelMunicipio = 0.0;
      for (let j = 0; j < Anzoategui[i].cantidadSectores; j++) {
        presupuestoTotalDelMunicipio +=
          Anzoategui[i].sectores[j].presupuestoAnual;
        Porcentaje =
          (presupuestoTotalDelMunicipio * presupuestoTotalEstatal) / 100;

        console.log(`El presupuesto total del municipio ${i + 1} es :`);
        console.log(`${presupuestoTotalDelMunicipio} Bs`);
        console.log(`Representa el :${Porcentaje} % del presupuesto estatal`);
      }
    }
  }
}

function MostrarExtremosHombres(Anzotagui) {
  let indiceMayor = 0,
    indiceMenor = 0;

  for (let i = 1; i < Anzotagui.cantidadSectores; i++) {
    if (
      Anzotagui.sectores[i].cantidadHombres >
      Anzotagui.sectores[indiceMayor].cantidadHombres
    ) {
      indiceMayor = i;
    }

    if (
      Anzotagui.sectores[i].cantidadHombres <
      Anzotagui.sectores[indiceMenor].cantidadHombres
    ) {
      indiceMenor = i;
    }
    console.log(
      `En el municipio ${Anzotagui.ciudadCapital}, los sectores con mayor cantidad de hombres son:`
    );
    console.log(
      `Nombre: ${Anzotagui.sectores[indiceMayor].nomberSector}, Población: ${Anzotagui.sectores[indiceMayor].cantidadHombres}`
    );

    console.log(
      `En el municipio ${Anzotagui.ciudadCapital}, los sectores con menor cantidad de hombres son:`
    );
    console.log(
      `Nombre: ${Anzotagui.sectores[indiceMenor].nomberSector}, Población: ${Anzotagui.sectores[indiceMenor].cantidadHombres}`
    );
  }
}

function main() {
  let cantidadMunicipios = 0;
  let municipioMostrarExtremosHombres;

  let Anzoategui = Array(MAX_MUNICIPIOS).fill(new Municipio());

  console.log("Ingrese cantidad de municipios a trabajar, máximo 21: ");
  cantidadMunicipios = parseInt(prompt());
  do {
    if (cantidadMunicipios < 0 || cantidadMunicipios > MAX_MUNICIPIOS) {
      console.log("Ingrese un número válido (Máximo 21)");
      cantidadMunicipios = parseInt(prompt());
    }
  } while (cantidadMunicipios < 0 || cantidadMunicipios > MAX_MUNICIPIOS);

  for (let i = 0; i < cantidadMunicipios; i++) {
    console.log(`Ingrese cantidad de sectores para el municipio ${i + 1}`);
    let cantidadSectores = parseInt(prompt());
    do {
      if (cantidadSectores < 0 || cantidadSectores > MAX_SECTORES) {
        console.log("Ingrese un número válido (Máximo 10): ");
        cantidadSectores = parseInt(prompt());
      }
    } while (cantidadSectores < 0 || cantidadSectores > MAX_SECTORES);
    CargarMunicipios(Anzoategui[i]);
  }

  PresupuestoPorMunicipio(Anzoategui, cantidadMunicipios);

  console.log(
    "Ingrese el número del municipio para mostrar extremos de población de hombres: "
  );
  municipioMostrarExtremosHombres = parseInt(prompt());
  if (
    municipioMostrarExtremosHombres >= 1 &&
    municipioMostrarExtremosHombres <= cantidadMunicipios
  ) {
    MostrarExtremosHombres(Anzoategui[municipioMostrarExtremosHombres - 1]);
  } else {
    console.log("Número de municipio inválido.");
  }
}

main();
