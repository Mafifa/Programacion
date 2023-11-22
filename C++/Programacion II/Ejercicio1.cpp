/*	Una empresa desea manejar la informacion de sus 20 vendedores que incluyen

Nombre-	Cedula-	Direccion- Correo.

Y la informacion de ventas por cada uno de los 10 articulos que maneja la
 compa�ia de los cuales se tiene:

Codigo del Articulo- Cuota de venta- Cantidad vendida.

Tambien se maneja la informacion de capacitacion que contiene:

Nombre del Curso- Nro de Horas- Institucion- Costo en Bs.

Se tiene informacion de que cada empleado realiza entre 3 y 5 cursos.  Se pide lo siguiente:
"	Definir las estructuras
"	Realizar una funcion para cargar los datos
"	1 Una funcion para mostrar por cada vendedor aquellos productos en que no ha cubierto su
     cuota de ventas.LISTO
"	2 Una funcione que especifique en cual vendedor se ha invertido mas dinero en cursos. LISTO
"	3 Funcion para especificar cual es el producto mas vendido.LISTO
"	4 Dando el nombre de un curso, muestre las instituciones que lo dictan y cual es su costo.*/

#include <iostream>
#include <conio.h>
#include <string.h>
using namespace std;

// STRUCT PARA LOS 10 PRODUCTOS
struct producto
{
    char Codigo[10];
    float Cuota;
    int CantidadVendida;
};
// STRUCT PARA LA CAPACITACION
struct capacitacion
{
    char Curso[20];
    int Horas;
    char Institucion[10];
    float Costo;
};

// STRUCT PARA EL VENDEDOR
struct vendedor
{
    char Nombre[30];
    int Cedula;
    char Direccion[30];
    char Correo[30];
    int CantidadCursos;
    struct producto Producto[10];
    struct capacitacion Capacitacion[5];
};
// Funcion para pedir numeros positivos
float MenoresCero(float num)
{
    do
    {
        if (num < 0)
        {
            printf("Numero no valido. Ingresar otro: ");
        }

    } while (num < 0);
    return (num);
}

// Funcion para cargar los datos
void CargarDatos(vendedor Vendedores)
{
    printf("Ingresando datos para informacion");
    printf("Nombre del vendedor: ");
    cin.ignore();
    cin.getline(Vendedores.Nombre, 30);
    printf("Cedula: ");
    cin.ignore();
    cin >> Vendedores.Cedula;
    printf("Direccion: ");
    cin.ignore();
    cin.getline(Vendedores.Direccion, 30);
    printf("Correo: ");
    cin.ignore();
    cin.getline(Vendedores.Correo, 30);
    printf("Cantidad de Cursos  (Solo de 3 a 5 Cursos): ");
    do
    {
        cin.ignore();
        cin >> Vendedores.CantidadCursos;
    } while ((Vendedores.CantidadCursos < 3) || (Vendedores.CantidadCursos > 5));

    printf("Ingresando datos para los productos");
    for (int i = 0; i < 10; i++) // PARA LOS PRODUCTOS
    {
        printf("Codigo: ");
        cin.ignore();
        cin.getline(Vendedores.Producto[i].Codigo, 10);

        printf("Cantidad: ");
        cin.ignore();
        Vendedores.Producto[i].CantidadVendida = MenoresCero(Vendedores.Producto[i].CantidadVendida);

        printf("Couta: ");
        cin.ignore();
        Vendedores.Producto[i].Cuota = MenoresCero(Vendedores.Producto[i].Cuota);
    }
    for (int j = 0; j < 5; j++) // PARA LOS CURSOS
    {
        float aux = 0;

        printf("Nombre del curso: ");
        cin.ignore();
        cin.getline(Vendedores.Capacitacion[j].Curso, 20);

        printf("Cantidad de horas del curso: ");
        cin.ignore();
        Vendedores.Capacitacion[j].Horas = MenoresCero(Vendedores.Capacitacion[j].Horas);

        printf("Nombre de la institucion: ");
        cin.ignore();
        cin.getline(Vendedores.Capacitacion[j].Institucion, 10);

        printf("Costo del curso en Bs: ");
        cin.ignore();
        Vendedores.Capacitacion[j].Costo = MenoresCero(Vendedores.Capacitacion[j].Costo);
    }
}
// Funcion para ver cual producto no cumple con la cuota
void MostarProductoSinCuota(vendedor Vendedores)
{
    cout << "Producto sin cubrir la cuota para el vendedor " << Vendedores.Nombre << ":" << endl;
    for (int i = 0; i < 10; i++)
    {
        if (Vendedores.Producto[i].CantidadVendida < Vendedores.Producto[i].Cuota)
        {
            cout << "El producto: " << Vendedores.Producto[i].Codigo << "No cumple la cuota" << endl;
        }
    }
}
// Funcion para encontar al vendedor con mas dinero invertido en curso
void MasInversionCursos(vendedor Vendedores[])
{
    float inversionTotal = 0.0;
    float mayorInversion = 0.0;
    int vendedorIndice = 0;

    for (int i = 0; i < 20; i++)
    {
        for (int j = 0; j < Vendedores[i].CantidadCursos; j++)
        {
            inversionTotal += Vendedores[i].Capacitacion[j].Costo;
        }
        if (inversionTotal > mayorInversion)
        {
            mayorInversion = inversionTotal;
            vendedorIndice = i;
        }
    }
    cout << "El vendedor con mayor inversion en cursos es " << Vendedores[vendedorIndice].Nombre << endl;
    cout << "Con una cantidad de dinero invertida de: " << mayorInversion << endl;
}

void ProductoMasVendido(vendedor Vendedores[])
{
    int IndiceProducto = 0;
    int IndiceVendedor = 0;
    int CantidadMayor = 0;

    for (int i = 0; i < 20; i++)
    {

        for (int j = 0; j < 10; j++)
        {
            if (Vendedores[i].Producto[j].CantidadVendida > CantidadMayor)
            {
                CantidadMayor = Vendedores[i].Producto[j].CantidadVendida;
                IndiceVendedor = i;
                IndiceProducto = j;
            }
        }
    }
    cout << "El producto mas vendido es: " << Vendedores[IndiceVendedor].Producto[IndiceProducto].Codigo << endl;
}
// Funcion para buscar curso por nombre
void MostarInfoCurso(vendedor vendedores[], char opc[])
{
    cout << "Instituciones que ofrecen el curso " << opc << " y su costo" << endl;
    for (int i = 0; i < 20; i++)
    {
        for (int j = 0; j < vendedores[i].CantidadCursos; j++)
        {
            if (vendedores[i].Capacitacion[j].Curso == opc)
            {
                cout << "Vendedor: " << vendedores[i].Nombre << endl;
                cout << "Institucion: " << vendedores[i].Capacitacion[j].Institucion << endl;
                cout << "Costo: " << vendedores[i].Capacitacion[j].Costo << endl;
            }
        }
    }
}

int main()
{
    struct vendedor Vendedores[20];
    char opc[20];

    for (int i = 0; i < 20; i++)
        CargarDatos(Vendedores[i]);

    // Llamada a las funciones creadas
    for (int i = 0; i < 20; i++)
        MostarProductoSinCuota(Vendedores[i]);

    ProductoMasVendido(Vendedores);

    MasInversionCursos(Vendedores);

    printf("Buscar curso por nombre");
    do
    {
        printf("Escriba el nombre del curso a buscar o escriba '0' para salir");
        cin.getline(opc, 20);
        if (opc[1] != '0')
        {
            MostarInfoCurso(Vendedores, opc);
        }

    } while (opc[1] == '0');
    return 0;
}
