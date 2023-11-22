#include <iostream>
using namespace std;

const int MaxAtletas = 30;
const int MaxJueces = 9;

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
      // Comparamos los caracteres uno a uno hasta encontrar el final de la cadena
      int k = 0;
      while (atletas[i].pais[k] != '\0' && jueces[j].pais[k] != '\0' && atletas[i].pais[k] == jueces[j].pais[k])
      {
        k++;
      }

      // Si ambos llegaron al final de la cadena al mismo tiempo, son iguales
      if (atletas[i].pais[k] == '\0' && jueces[j].pais[k] == '\0' && atletas[i].intentos[0].puntaje > 8.75)
      {
        cout << "Nombre del Juez: " << jueces[j].nombre << ", País del Juez: " << jueces[j].pais << endl;
      }
    }
  }
}

int main()
{
  Atleta atletas[MaxAtletas];
  Juez jueces[MaxJueces];

  // Cargar información de los atletas
  for (int i = 0; i < MaxAtletas; i++)
  {
    cout << "Datos del atleta #" << i + 1 << ":" << endl;
    CargarAtleta(atletas[i]);
    CalcularPuntaje(atletas[i]);
    cout << "------------------------------------" << endl;
  }

  // Cargar información de los jueces
  for (int i = 0; i < MaxJueces; i++)
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
  MostrarAtletasSinSaltoBDificultad(atletas, MaxAtletas);
  cout << "------------------------------------" << endl;
  MostrarJuecesPuntajeMayor(atletas, jueces, MaxAtletas, MaxJueces);

  return 0;
}
