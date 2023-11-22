/* La gobernacion del estado anzoategui desea llevar un registro pormenorizado de cada uno de los
21 municipios que la integran. Por cada uno de ellos se necesita saber cual es la ciudad capital,
el nombre del alcalde y la fecha de fundacion. Ademas se lleva un registro de los sectores que lo
integran (maximo 10 sectores por municipio). De estos sectores se desea conocer nombre del sector y
la poblacion tanto hombres como mujeres y el presupuesto anual asignado en bolivares. Se pide:
1.declarar y cargar las estructuras y variables.
2.funcion que calcule y muestre el monto del presupuesto a cada municipio e indique que porcentaje
representa del presupuesto estadal. (este monto se obtiene a partir de los sectores)
3.dado un municipio muestre nombre y poblacion de los sectores que poseen la mayor y la menor
cantidad de hombres.
4. determine cual de los municipios fundados en el segundo trimestre del año, tiene menor
presupuesto asignado e indique el monto.*/

#include <iostream>
#include <conio.h>
#include <string.h>

using namespace std;
#define MAX_MUNICIPIOS 21
#define MAX_SECTORES 10

struct Sectores
{
  char nomberSector[50];
  int cantidadHombres;
  int cantidadMujeres;
  float presupuestoAnual;
};

struct Municipio
{
  char ciudadCapital[50];
  char nombreAlcalde[50];
  char fechaFundacion[50];
  int cantidadSectores;
  struct Sectores sectores[MAX_SECTORES];
};

float MenosCero(float n) // Funcion para pedir numeros positivos
{
  do
  {
    if (n < 0)
    {
      printf("Ingrese un numero positivo por favor: ");
      cin >> n;
    }
  } while (n < 0);
  return n;
}

// Funcion para cargar cada municipio
void CargarMunicipios(Municipio Anzoategui, int cantidadSectores)
{
  printf("Ingrese nombre del municipio: ");
  cin.ignore();
  cin.getline(Anzoategui.ciudadCapital, 50);

  printf("Ingrese Nombre del alcalde: ");
  cin.ignore();
  cin.getline(Anzoategui.nombreAlcalde, 50);

  printf("Ingrese fecha de fundacion en formato DD/MM/AA");
  cin.ignore();
  cin.getline(Anzoategui.fechaFundacion, 50);

  cin.ignore();
  cantidadSectores = Anzoategui.cantidadSectores;

  cout << "Ahora se cargaran los sectores del municipio :";
  for (int i = 0; i < cantidadSectores; i++)
  {
    printf("Ingrese nombre del sector: ");
    cin.ignore();
    cin.getline(Anzoategui.sectores[i].nomberSector, 50);

    printf("Ingrese cantidad de hombres: ");
    cin.ignore();
    cin >> Anzoategui.sectores[i].cantidadHombres;

    printf("Ingrese cantidad de mujeres en el sector");
    cin.ignore();
    cin >> Anzoategui.sectores[i].cantidadMujeres;

    printf("Ingrese presupuesto anual del sector");
    cin.ignore();
    cin >> Anzoategui.sectores[i].presupuestoAnual;
  }
}

// 2.funcion que calcule y muestre el monto del presupuesto a cada municipio e indique que porcentaje
// representa del presupuesto estadal. (este monto se obtiene a partir de los sectores)
void PresupuestoPorMunicipio(Municipio Anzoategui[], int cantidadMunicipios)
{
  float presupuestoTotalEstatal = 0;
  float Porcentaje;

  // Calcular presupuesto total estatal
  for (int i = 0; i < cantidadMunicipios; i++)
  {
    float presupuestoTotalDelMunicipio;
    for (int j = 0; j < Anzoategui[i].cantidadSectores; j++)
    {
      presupuestoTotalDelMunicipio += Anzoategui[i].sectores[j].presupuestoAnual;
      presupuestoTotalEstatal += presupuestoTotalDelMunicipio;
    }
    // Calcular presupuesto del municipio y su porcentaje
    for (int i = 0; i < cantidadMunicipios; i++)
    {
      float presupuestoTotalDelMunicipio;
      for (int j = 0; j < Anzoategui[i].cantidadSectores; j++)
      {
        presupuestoTotalDelMunicipio += Anzoategui[i].sectores[j].presupuestoAnual;
        Porcentaje = (presupuestoTotalDelMunicipio * presupuestoTotalEstatal) / 100;

        cout << "El presupuesto total del municipio " << i + 1 << " es :" << endl;
        cout << presupuestoTotalDelMunicipio << " Bs" << endl;
        cout << "Representa el :" << Porcentaje << " % "
             << "del presupuesto estatal";
      }
    }
  }
}

// Función para mostrar el nombre y población de los sectores
// con la mayor y la menor cantidad de hombres en un municipio
void MostrarExtremosHombres(Municipio Anzotagui)
{
  int indiceMayor = 0, indiceMenor = 0;

  for (int i = 1; i < Anzotagui.cantidadSectores; i++)
  {
    if (Anzotagui.sectores[i].cantidadHombres > Anzotagui.sectores[indiceMayor].cantidadHombres)
    {
      indiceMayor = i;
    }

    if (Anzotagui.sectores[i].cantidadHombres < Anzotagui.sectores[indiceMenor].cantidadHombres)
    {
      indiceMenor = i;
    }
    cout << "En el municipio " << Anzotagui.ciudadCapital << ", los sectores con mayor cantidad de hombres son:" << endl;
    cout << "Nombre: " << Anzotagui.sectores[indiceMayor].nomberSector << ", Población: " << Anzotagui.sectores[indiceMayor].cantidadHombres << endl;

    cout << "En el municipio " << Anzotagui.ciudadCapital << ", los sectores con menor cantidad de hombres son:" << endl;
    cout << "Nombre: " << Anzotagui.sectores[indiceMenor].nomberSector << ", Población: " << Anzotagui.sectores[indiceMenor].cantidadHombres << endl;
  }
}

int main()
{
  int aux, cantidadMunicipios, cantidadSectores;
  int presupuestoTotalEstatal;
  int municipioMostrarExtremosHombres;

  Municipio Anzoategui[MAX_MUNICIPIOS];

  printf("Inrgese cantidad de municipios a trabajar, maximo 21: ");
  cin >> cantidadMunicipios;
  // Confirmamos que la cantidad de municipios sea correcta y guardamos
  do
  {
    if ((cantidadMunicipios < 0) || (cantidadMunicipios > MAX_MUNICIPIOS))
    {
      printf("Ingrese un numero valido (Maximo 21)");
      cin >> cantidadMunicipios;
    }
  } while ((cantidadMunicipios < 0) || (cantidadMunicipios > MAX_MUNICIPIOS));

  for (int i = 0; i < cantidadMunicipios; i++)
  {
    // Pedimos la cantidad de sectores para ese municipio
    cout << "Inrgese cantidad de sectores para el municipio " << i + 1 << endl;
    cin >> cantidadSectores;
    // Confirmamos que la cantidad de sectres sea valida
    do
    {
      if ((cantidadSectores < 0) || (cantidadSectores > MAX_SECTORES))
      {
        printf("Ingrese un numero valido (Maximo 10): ");
        cin >> cantidadSectores;
      }
    } while ((cantidadSectores < 0) || (cantidadSectores > MAX_SECTORES));
    CargarMunicipios(Anzoategui[i], cantidadSectores);
  }

  PresupuestoPorMunicipio(Anzoategui, cantidadMunicipios);

  cout << "Ingrese el número del municipio para mostrar extremos de población de hombres: ";
  cin >> municipioMostrarExtremosHombres;
  cin.ignore();
  if ((municipioMostrarExtremosHombres >= 1) && (municipioMostrarExtremosHombres <= cantidadMunicipios))
  {
    MostrarExtremosHombres(Anzoategui[municipioMostrarExtremosHombres - 1]);
  }
  else
  {
    cout << "Número de municipio inválido." << endl;
  }

  return 0;
}