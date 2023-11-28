class Sectores:
    def __init__(self):
        self.nomberSector = ''
        self.cantidadHombres = 0
        self.cantidadMujeres = 0
        self.presupuestoAnual = 0.0

class Municipio:
    def __init__(self):
        self.ciudadCapital = ''
        self.nombreAlcalde = ''
        self.fechaFundacion = ''
        self.cantidadSectores = 0
        self.sectores = []

def menos_cero(n):
    while n < 0:
        print("Ingrese un número positivo por favor: ")
        n = float(input())
    return n

def cargar_municipios(anzoategui, cantidad_municipios):
    for i in range(cantidad_municipios):
        anzoategui.append(Municipio())
        print("Ingrese nombre del municipio: ")
        anzoategui[i].ciudadCapital = input()
        print("Ingrese Nombre del alcalde: ")
        anzoategui[i].nombreAlcalde = input()
        print("Ingrese fecha de fundacion en formato DD/MM/AA: ")
        anzoategui[i].fechaFundacion = input()
        cantidad_sectores = menos_cero(int(input("Ingrese cantidad de sectores para el municipio: ")))
        anzoategui[i].cantidadSectores = cantidad_sectores
        print("Ahora se cargarán los sectores del municipio:")
        anzoategui[i].sectores = [Sectores() for _ in range(cantidad_sectores)]
        for j in range(cantidad_sectores):
            print("Ingrese nombre del sector: ")
            anzoategui[i].sectores[j].nomberSector = input()
            print("Ingrese cantidad de hombres: ")
            anzoategui[i].sectores[j].cantidadHombres = menos_cero(int(input()))
            print("Ingrese cantidad de mujeres en el sector: ")
            anzoategui[i].sectores[j].cantidadMujeres = menos_cero(int(input()))
            print("Ingrese presupuesto anual del sector: ")
            anzoategui[i].sectores[j].presupuestoAnual = menos_cero(float(input()))

def presupuesto_por_municipio(anzoategui, cantidad_municipios):
    presupuesto_total_estatal = 0
    for i in range(cantidad_municipios):
        presupuesto_total_del_municipio = 0
        for j in range(anzoategui[i].cantidadSectores):
            presupuesto_total_del_municipio += anzoategui[i].sectores[j].presupuestoAnual
        presupuesto_total_estatal += presupuesto_total_del_municipio
        print(f"El presupuesto total del municipio {i + 1} es: {presupuesto_total_del_municipio} Bs")
        porcentaje = (presupuesto_total_del_municipio * 100) / presupuesto_total_estatal
        print(f"Representa el: {porcentaje}% del presupuesto estatal")

def mostrar_extremos_hombres(anzotagui):
    indice_mayor = max(range(anzotagui.cantidadSectores), key=lambda i: anzotagui.sectores[i].cantidadHombres)
    indice_menor = min(range(anzotagui.cantidadSectores), key=lambda i: anzotagui.sectores[i].cantidadHombres)
    
    print(f"En el municipio {anzotagui.ciudadCapital}, los sectores con mayor cantidad de hombres son:")
    print(f"Nombre: {anzotagui.sectores[indice_mayor].nomberSector}, Población: {anzotagui.sectores[indice_mayor].cantidadHombres}")

    print(f"En el municipio {anzotagui.ciudadCapital}, los sectores con menor cantidad de hombres son:")
    print(f"Nombre: {anzotagui.sectores[indice_menor].nomberSector}, Población: {anzotagui.sectores[indice_menor].cantidadHombres}")

if __name__ == "__main__":
    MAX_MUNICIPIOS = 21
    anzoategui = []

    print("Ingrese cantidad de municipios a trabajar, máximo 21: ")
    cantidad_municipios = menos_cero(int(input()))
    
    for i in range(cantidad_municipios):
        cargar_municipios(anzoategui, cantidad_municipios)

    presupuesto_por_municipio(anzoategui, cantidad_municipios)

    print("Ingrese el número del municipio para mostrar extremos de población de hombres: ")
    municipio_mostrar_extremos_hombres = int(input())
    if 1 <= municipio_mostrar_extremos_hombres <= cantidad_municipios:
        mostrar_extremos_hombres(anzoategui[municipio_mostrar_extremos_hombres - 1])
    else:
        print("Número de municipio inválido.")