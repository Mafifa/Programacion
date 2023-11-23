#include <iostream>
#include <string.h>
using namespace std;
#define MaxAtletas 30
#define MaxJueces 30

// Estructura para la información de los jueces
struct Juez
{
  char nombre[50];
  char pais[50];
  float puntaje;
};

// Estructura para la información de los saltos de un atleta
struct Salto
{
  char dificultad; // A, B, C o D
  float puntaje;
};

// Estructura para la información de un atleta
struct Atleta
{
  char pais[50];
  char nombre[50];
  int edad;
  Salto intentos[3];
  float puntajeTotal;
};

// Función para cargar la información de un atleta
void CargarAtleta(Atleta atleta)
{
  cout << "Ingrese el país del atleta: ";
  cin.getline(atleta.pais, 50);

  cout << "Ingrese el nombre del atleta: ";
  cin.getline(atleta.nombre, 50);

  cout << "Ingrese la edad del atleta: ";
  cin >> atleta.edad;
  cin.ignore(); // Limpiar el buffer de entrada

  for (int i = 0; i < 3; i++)
  {
    cout << "Salto #" << i + 1 << ":" << endl;
    cout << "Dificultad del salto (A, B, C o D): ";
    cin >> atleta.intentos[i].dificultad;
    cout << "Puntaje otorgado (0 a 10): ";
    cin >> atleta.intentos[i].puntaje;
    cin.ignore(); // Limpiar el buffer de entrada
  }
}

// Función para calcular el puntaje total de un atleta
void CalcularPuntaje(Atleta atleta)
{
  float puntajes[3];
  for (int i = 0; i < 3; i++)
  {
    puntajes[i] = atleta.intentos[i].puntaje;
  }

  // Eliminar el puntaje más alto y el puntaje más bajo
  float minPuntaje = puntajes[0];
  float maxPuntaje = puntajes[0];
  int minIndex = 0;
  int maxIndex = 0;

  for (int i = 1; i < 3; i++)
  {
    if (puntajes[i] < minPuntaje)
    {
      minPuntaje = puntajes[i];
      minIndex = i;
    }

    if (puntajes[i] > maxPuntaje)
    {
      maxPuntaje = puntajes[i];
      maxIndex = i;
    }
  }

  puntajes[minIndex] = 0; // Eliminar el puntaje más bajo
  puntajes[maxIndex] = 0; // Eliminar el puntaje más alto

  // Calcular el puntaje total
  float puntajeTotal = 0;
  for (int i = 0; i < 3; i++)
  {
    puntajeTotal += puntajes[i];
  }

  // Multiplicar por el grado de dificultad
  switch (atleta.intentos[0].dificultad)
  {
  case 'A':
    puntajeTotal *= 0.45;
    break;
  case 'B':
    puntajeTotal *= 0.70;
    break;
  case 'C':
    puntajeTotal *= 0.85;
    break;
  case 'D':
    puntajeTotal *= 1.2;
    break;
  default:
    cout << "Dificultad no válida." << endl;
    return;
  }

  atleta.puntajeTotal = puntajeTotal;
}

// Función para mostrar atletas que no realizaron saltos con dificultad B
void MostrarAtletasSinSaltoBDificultad(Atleta atletas[], int numAtletas)
{
  cout << "Atletas que no realizaron saltos con dificultad B:" << endl;
  for (int i = 0; i < numAtletas; i++)
  {
    bool tieneSaltoBDificultad = false;
    for (int j = 0; j < 3; j++)
    {
      if (atletas[i].intentos[j].dificultad == 'B')
      {
        tieneSaltoBDificultad = true;
        break;
      }
    }

    if (!tieneSaltoBDificultad)
    {
      cout << "Nombre: " << atletas[i].nombre << ", País: " << atletas[i].pais << endl;
    }
  }
}

// Función para mostrar jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto
void MostrarJuecesPuntajeMayor(Atleta atletas[], Juez jueces[], int numAtletas, int numJueces)
{
  cout << "Jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto:" << endl;
  for (int i = 0; i < numAtletas; i++)
  {
    for (int j = 0; j < numJueces; j++)
    {
      // Busamos el pais y la comparacion del puntaje
      if (strcmp(atletas[i].pais, jueces[j].pais) == 0 && atletas[i].intentos[0].puntaje > 8.75)
      {
        cout << "Nombre del Juez: " << jueces[j].nombre << ", País del Juez: " << jueces[j].pais << endl;
      }
    }
  }
}

int main()
{
  int cantidadAtletas, cantidadJueces;
  Atleta atletas[MaxAtletas];
  Juez jueces[MaxJueces];

  printf("Ingrese cantidad de atletas (maximo 30): ");
  cin >> cantidadAtletas;
  do
  {
    if ((cantidadAtletas < 0) || (cantidadAtletas > 30))
    {
      printf("Ingrese una cantidad valida: ");
      cin >> cantidadAtletas;
    }
  } while ((cantidadAtletas < 0) || (cantidadAtletas > 30));

  printf("Ingrese cantidad de jueces (maximo 9) : ");
  cin >> cantidadJueces;
  do
  {
    if ((cantidadJueces < 0) || (cantidadJueces > 9))
    {
      printf("Ingrese una cantidad valida: ");
      cin >> cantidadJueces;
    }
  } while ((cantidadJueces < 0) || (cantidadJueces > 9));

  // Cargar información de los atletas
  for (int i = 0; i < cantidadAtletas; i++)
  {
    cout << "Datos del atleta #" << i + 1 << ":" << endl;
    CargarAtleta(atletas[i]);
    CalcularPuntaje(atletas[i]);
    cout << "------------------------------------" << endl;
  }

  // Cargar información de los jueces
  for (int i = 0; i < cantidadJueces; i++)
  {
    cout << "Datos del juez #" << i + 1 << ":" << endl;
    cout << "Ingrese el nombre del juez: ";
    cin.getline(jueces[i].nombre, 50);

    cout << "Ingrese el país del juez: ";
    cin.getline(jueces[i].pais, 50);

    cout << "Ingrese el puntaje otorgado por el juez (0 a 10): ";
    cin >> jueces[i].puntaje;
    cin.ignore(); // Limpiar el buffer de entrada
    cout << "------------------------------------" << endl;
  }

  // Ejemplo de uso de funciones
  MostrarAtletasSinSaltoBDificultad(atletas, cantidadAtletas);
  cout << "------------------------------------" << endl;
  MostrarJuecesPuntajeMayor(atletas, jueces, cantidadAtletas, cantidadJueces);

  return 0;
}
