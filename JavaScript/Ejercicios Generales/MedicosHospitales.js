const MAXMEDICOS = 70;
const MAXCAMPANIAS = 5;
const CANTIDADNOMBRE = 50;
const MAXHOSPITAL = 50;

class Campania {
  constructor() {
    this.dia = 0;
    this.mes = 0;
    this.anio = 0;
    this.barrio = "";
    this.dosisNinos = 0;
    this.dosisJovenes = 0;
    this.dosisAdultos = 0;
  }
}

class Hospital {
  constructor() {
    this.director = "";
    this.estado = "";
    this.numMedicosAdjuntos = 0;
  }
}

class Medico {
  constructor() {
    this.nombre = "";
    this.hospital = "";
    this.especialidad = "";
    this.sueldo = 0.0;
    this.campanias = Array(MAXCAMPANIAS).fill(new Campania());
    this.numCampanias = 0;
  }
}

function cargarMedicos(medicos, numMedicos) {
  for (let i = 0; i < numMedicos; ++i) {
    console.log(`Ingrese el nombre del médico ${i + 1}: `);
    medicos[i].nombre = prompt();

    console.log("Ingrese el hospital al que pertenece: ");
    medicos[i].hospital = prompt();

    console.log("Ingrese la especialidad del médico: ");
    medicos[i].especialidad = prompt();

    console.log("Ingrese el sueldo del médico: ");
    medicos[i].sueldo = parseFloat(prompt());

    console.log(
      `Ingrese la cantidad de campañas en las que participó (máximo ${MAXCAMPANIAS}): `
    );
    medicos[i].numCampanias = parseInt(prompt());

    for (let j = 0; j < medicos[i].numCampanias; ++j) {
      console.log(`Ingrese la fecha de la campaña ${j + 1}: `);
      console.log("Dia: ");
      medicos[i].campanias[j].dia = parseInt(prompt());
      console.log("Mes: ");
      medicos[i].campanias[j].mes = parseInt(prompt());
      console.log("Año: ");
      medicos[i].campanias[j].anio = parseInt(prompt());

      console.log(`Ingrese el barrio de la campaña ${j + 1}: `);
      medicos[i].campanias[j].barrio = prompt();

      console.log("Ingrese la cantidad de dosis aplicadas a niños: ");
      medicos[i].campanias[j].dosisNinos = parseInt(prompt());

      console.log("Ingrese la cantidad de dosis aplicadas a jóvenes: ");
      medicos[i].campanias[j].dosisJovenes = parseInt(prompt());

      console.log("Ingrese la cantidad de dosis aplicadas a adultos: ");
      medicos[i].campanias[j].dosisAdultos = parseInt(prompt());
    }
  }
}

function calcularTotalPacientesPorGrupo(medicos, numMedicos) {
  for (let i = 0; i < numMedicos; ++i) {
    let totalNinos = 0;
    let totalJovenes = 0;
    let totalAdultos = 0;

    for (let j = 0; j < medicos[i].numCampanias; ++j) {
      totalNinos += medicos[i].campanias[j].dosisNinos;
      totalJovenes += medicos[i].campanias[j].dosisJovenes;
      totalAdultos += medicos[i].campanias[j].dosisAdultos;
    }

    console.log(`Médico: ${medicos[i].nombre}`);
    console.log("Total de pacientes vacunados:");
    console.log(`  Niños: ${totalNinos}`);
    console.log(`  Jóvenes: ${totalJovenes}`);
    console.log(`  Adultos: ${totalAdultos}`);
    console.log("---------------------------");
  }
}

function listarNeumonologosSinVacunarNinos(medicos, numMedicos) {
  console.log(
    "Neumonólogos que no han vacunado niños en el primer trimestre del año:"
  );
  for (let i = 0; i < numMedicos; ++i) {
    let dosisTotal = 0;
    if (medicos[i].especialidad === "neumonologo") {
      for (let j = 0; j < medicos[i].numCampanias; ++j) {
        if (medicos[i].campanias[j].mes <= 3) {
          dosisTotal = medicos[i].campanias[j].dosisNinos;
        }
      }
      if (dosisTotal === 0) {
        console.log(medicos[i].nombre);
      }
    }
  }
  console.log("---------------------------");
}

function determinarBarriosCampanias(medicos, numMedicos) {
  for (let i = 0; i < numMedicos; i++) {
    let maxVacunasJovenes = 0;
    let minVacunasJovenes = 0;
    let barrioMaxVacunasJovenes = "";
    let barrioMinVacunasJovenes = "";

    for (let j = 0; j < medicos[i].numCampanias; ++j) {
      if (medicos[i].campanias[j].dosisJovenes > maxVacunasJovenes) {
        maxVacunasJovenes = medicos[i].campanias[j].dosisJovenes;
        barrioMaxVacunasJovenes = medicos[i].campanias[j].barrio;
      }

      if (
        medicos[i].campanias[j].dosisJovenes < minVacunasJovenes ||
        minVacunasJovenes === 0
      ) {
        minVacunasJovenes = medicos[i].campanias[j].dosisJovenes;
        barrioMinVacunasJovenes = medicos[i].campanias[j].barrio;
      }
    }

    console.log(`Médico: ${medicos[i].nombre}`);
    console.log(
      `En el barrio ${barrioMaxVacunasJovenes} vacunó más jóvenes (cantidad: ${maxVacunasJovenes})`
    );
    console.log(
      `En el barrio ${barrioMinVacunasJovenes} vacunó menos jóvenes (cantidad: ${minVacunasJovenes})`
    );
    console.log("---------------------------");
  }
}

function main() {
  const medicos = Array(MAXMEDICOS).fill(new Medico());
  let numMedicos = 0;

  console.log("Ingrese cantidad de médicos (máximo 70): ");
  numMedicos = parseInt(prompt());
  do {
    if (numMedicos < 0 || numMedicos > 70) {
      console.log("Cantidad no válida, ingrese otra cantidad: ");
      numMedicos = parseInt(prompt());
    }
  } while (numMedicos < 0 || numMedicos > 70);

  // A)
  cargarMedicos(medicos, numMedicos);

  // B)
  calcularTotalPacientesPorGrupo(medicos, numMedicos);

  // C)
  listarNeumonologosSinVacunarNinos(medicos, numMedicos);

  // D)
  determinarBarriosCampanias(medicos, numMedicos);
}

main();
