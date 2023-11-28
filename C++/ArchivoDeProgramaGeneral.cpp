#include <iostream>
#include <conio.h>
struct Alumno
{
  char nombre[20];
  long cedula;
  int nsts[11];
};

char Menu()
{
  char OP;
  system "CLS";

  gotoxy(30, 8);
  printf("Menu de opciones");

  gotoxy(20, 10);
  printf("1) Incluir");

  gotoxy(20, 12);
  printf("2) Consultar");

  gotoxy(20, 14);
  printf("Modificar");

  gotoxy(20, 16);
  printf("Eliminar");

  gotoxy(20, 18);
  printf("Salir");

  gotoxy(50, 20);
  printf("Seleccion: ");
  return OP;
}

long int busqueda(long int cedulas)
{
  int band = 0;
  FILE *arch1;

  arch1 = fopen("USMDIAL", "r");
  while (band == 0)
  {
    fpeaul(&)
  }
}
