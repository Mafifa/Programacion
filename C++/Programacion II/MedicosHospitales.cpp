#include <iostream>
#include <string.h>
using namespace std;

#define MAXMEDICOS 70
#define MAXCAMPANIAS 5
#define CANTIDADNOMBRE 50
#define MAXHOSPITAL 50

struct Campania
{
  int dia;
  int mes;
  int anio;
  char barrio[20];
  int dosisNinos;
  int dosisJovenes;
  int dosisAdultos;
};

struct Hospital
{
  char director[CANTIDADNOMBRE];
  char estado[CANTIDADNOMBRE];
  int numMedicosAdjuntos;
};

struct Medico
{
  char nombre[CANTIDADNOMBRE];
  char hospital[MAXHOSPITAL];
  char especialidad[CANTIDADNOMBRE];
  double sueldo;
  Campania campanias[MAXCAMPANIAS];
  int numCampanias;
};

void cargarMedicos(Medico medicos[], int numMedicos)
{
  for (int i = 0; i < numMedicos; ++i)
  {
    cout << "Ingrese el nombre del médico " << i + 1 << ": ";
    cin.ignore();
    cin.getline(medicos[i].nombre, CANTIDADNOMBRE);

    cout << "Ingrese el hospital al que pertenece: ";
    cin.getline(medicos[i].hospital, MAXHOSPITAL);

    cout << "Ingrese la especialidad del médico: ";
    cin.getline(medicos[i].especialidad, CANTIDADNOMBRE);

    cout << "Ingrese el sueldo del médico: ";
    cin >> medicos[i].sueldo;

    cout << "Ingrese la cantidad de campañas en las que participó (máximo " << MAXCAMPANIAS << "): ";
    cin >> medicos[i].numCampanias;

    for (int j = 0; j < medicos[i].numCampanias; ++j)
    {
      cout << "Ingrese la fecha de la campaña " << j + 1 << ": ";
      cout << "Dia: ";
      cin.ignore();
      cin >> medicos[i].campanias[j].dia;
      cout << "Mes: ";
      cin.ignore();
      cin >> medicos[i].campanias[j].mes;
      cout << "anio: ";
      cin.ignore();
      cin >> medicos[i].campanias[j].anio;

      cout << "Ingrese el barrio de la campaña " << j + 1 << ": ";
      cin.getline(medicos[i].campanias[j].barrio, 20);

      cout << "Ingrese la cantidad de dosis aplicadas a niños: ";
      cin >> medicos[i].campanias[j].dosisNinos;

      cout << "Ingrese la cantidad de dosis aplicadas a jóvenes: ";
      cin >> medicos[i].campanias[j].dosisJovenes;

      cout << "Ingrese la cantidad de dosis aplicadas a adultos: ";
      cin >> medicos[i].campanias[j].dosisAdultos;
    }
  }
}

void calcularTotalPacientesPorGrupo(Medico medicos[], int numMedicos)
{
  for (int i = 0; i < numMedicos; ++i)
  {
    int totalNinos = 0;
    int totalJovenes = 0;
    int totalAdultos = 0;

    for (int j = 0; j < medicos[i].numCampanias; ++j)
    {
      totalNinos += medicos[i].campanias[j].dosisNinos;
      totalJovenes += medicos[i].campanias[j].dosisJovenes;
      totalAdultos += medicos[i].campanias[j].dosisAdultos;
    }

    cout << "Medico: " << medicos[i].nombre << endl;
    cout << "Total de pacientes vacunados:" << endl;
    cout << "  Ninos: " << totalNinos << endl;
    cout << "  Jovenes: " << totalJovenes << endl;
    cout << "  Adultos: " << totalAdultos << endl;
    cout << "---------------------------" << endl;
  }
}

void listarNeumonologosSinVacunarNinos(Medico medicos[], int numMedicos)
{
  cout << "Neumonologos que no han vacunado niños en el primer trimestre del año:" << endl;
  for (int i = 0; i < numMedicos; ++i)
  {
    int dosisTotal = 0;
    if (strcmp(medicos[i].especialidad, "neumonologo") == 0)
    {
      for (int j = 0; j < medicos[i].numCampanias; ++j)
      {
        if ((medicos[i].campanias[j].mes <= 3))
        {
          dosisTotal = medicos[i].campanias[j].dosisNinos;
        }
      }
      if (dosisTotal == 0)
      {
        cout << medicos[i].nombre;
      }
    }
  }
  cout << "---------------------------" << endl;
}

void determinarBarriosCampanias(Medico medicos[], int numMedicos)
{

  for (int i = 0; i < numMedicos; i++)
  {
    int maxVacunasJovenes = 0;
    int minVacunasJovenes = 0;
    char barrioMaxVacunasJovenes[20];
    char barrioMinVacunasJovenes[20];

    for (int j = 0; j < medicos[i].numCampanias; ++j)
    {
      if (medicos[i].campanias[j].dosisJovenes > maxVacunasJovenes)
      {
        maxVacunasJovenes = medicos[i].campanias[j].dosisJovenes;
        strcpy(barrioMaxVacunasJovenes, medicos[i].campanias[j].barrio);
      }

      if (medicos[i].campanias[j].dosisJovenes < minVacunasJovenes)
      {
        minVacunasJovenes = medicos[i].campanias[j].dosisJovenes;
        strcpy(barrioMinVacunasJovenes, medicos[i].campanias[j].barrio);
      }
    }

    cout << "Medico: " << medicos[i].nombre << endl;
    cout << "En el barrio " << barrioMaxVacunasJovenes << " vacuno mas jovenes (cantidad: " << maxVacunasJovenes << ")" << endl;
    cout << "En el barrio " << barrioMinVacunasJovenes << " vacuno menos jovenes (cantidad: " << minVacunasJovenes << ")" << endl;
    cout << "---------------------------" << endl;
  }
}

int main()
{
  Medico medicos[MAXMEDICOS];
  int numMedicos = 0;

  cout << "Ingrese cantidad de medicos (maximos 70): " << endl;
  cin >> numMedicos;
  do
  {
    if ((numMedicos < 0) || (numMedicos > 70))
    {
      cout << "Cantidad no valida, ingrese otra cantidad: ";
      cin >> numMedicos;
    }
  } while ((numMedicos < 0) || (numMedicos > 70));

  // A)
  cargarMedicos(medicos, numMedicos);

  // B)
  calcularTotalPacientesPorGrupo(medicos, numMedicos);

  // C)
  listarNeumonologosSinVacunarNinos(medicos, numMedicos);

  // D)
  determinarBarriosCampanias(medicos, numMedicos);

  return 0;
}
