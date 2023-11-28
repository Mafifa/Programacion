class Campania:
    def __init__(self):
        self.dia = 0
        self.mes = 0
        self.anio = 0
        self.barrio = ''
        self.dosisNinos = 0
        self.dosisJovenes = 0
        self.dosisAdultos = 0

class Hospital:
    def __init__(self):
        self.director = ''
        self.estado = ''
        self.numMedicosAdjuntos = 0

class Medico:
    def __init__(self):
        self.nombre = ''
        self.hospital = ''
        self.especialidad = ''
        self.sueldo = 0.0
        self.campanias = []
        self.numCampanias = 0

def cargar_medicos(medicos, num_medicos):
    for i in range(num_medicos):
        medico = Medico()
        print(f"Ingrese el nombre del médico {i + 1}: ")
        medico.nombre = input()
        print("Ingrese el hospital al que pertenece: ")
        medico.hospital = input()
        print("Ingrese la especialidad del médico: ")
        medico.especialidad = input()
        print("Ingrese el sueldo del médico: ")
        medico.sueldo = float(input())
        print(f"Ingrese la cantidad de campañas en las que participó (máximo {MAXCAMPANIAS}): ")
        medico.numCampanias = int(input())

        for j in range(medico.numCampanias):
            campania = Campania()
            print(f"Ingrese la fecha de la campaña {j + 1}: ")
            print("Dia: ")
            campania.dia = int(input())
            print("Mes: ")
            campania.mes = int(input())
            print("Año: ")
            campania.anio = int(input())
            print(f"Ingrese el barrio de la campaña {j + 1}: ")
            campania.barrio = input()
            print("Ingrese la cantidad de dosis aplicadas a niños: ")
            campania.dosisNinos = int(input())
            print("Ingrese la cantidad de dosis aplicadas a jóvenes: ")
            campania.dosisJovenes = int(input())
            print("Ingrese la cantidad de dosis aplicadas a adultos: ")
            campania.dosisAdultos = int(input())
            
            medico.campanias.append(campania)

        medicos.append(medico)

def calcular_total_pacientes_por_grupo(medicos):
    for medico in medicos:
        total_ninos = sum(campania.dosisNinos for campania in medico.campanias)
        total_jovenes = sum(campania.dosisJovenes for campania in medico.campanias)
        total_adultos = sum(campania.dosisAdultos for campania in medico.campanias)

        print(f"Medico: {medico.nombre}")
        print("Total de pacientes vacunados:")
        print(f"  Niños: {total_ninos}")
        print(f"  Jóvenes: {total_jovenes}")
        print(f"  Adultos: {total_adultos}")
        print("---------------------------")

def listar_neumonologos_sin_vacunar_ninos(medicos):
    print("Neumonólogos que no han vacunado niños en el primer trimestre del año:")
    for medico in medicos:
        dosis_total = sum(campania.dosisNinos for campania in medico.campanias if campania.mes <= 3)
        if medico.especialidad.lower() == "neumonologo" and dosis_total == 0:
            print(medico.nombre)
    print("---------------------------")

def determinar_barrios_campanias(medicos):
    for medico in medicos:
        max_vacunas_jovenes = 0
        min_vacunas_jovenes = float('inf')
        barrio_max_vacunas_jovenes = ''
        barrio_min_vacunas_jovenes = ''

        for campania in medico.campanias:
            if campania.dosisJovenes > max_vacunas_jovenes:
                max_vacunas_jovenes = campania.dosisJovenes
                barrio_max_vacunas_jovenes = campania.barrio

            if campania.dosisJovenes < min_vacunas_jovenes:
                min_vacunas_jovenes = campania.dosisJovenes
                barrio_min_vacunas_jovenes = campania.barrio

        print(f"Medico: {medico.nombre}")
        print(f"En el barrio {barrio_max_vacunas_jovenes} vacunó más jóvenes (cantidad: {max_vacunas_jovenes})")
        print(f"En el barrio {barrio_min_vacunas_jovenes} vacunó menos jóvenes (cantidad: {min_vacunas_jovenes})")
        print("---------------------------")

if __name__ == "__main__":
    MAXMEDICOS = 70
    MAXCAMPANIAS = 5
    CANTIDADNOMBRE = 50
    MAXHOSPITAL = 50
    medicos = []

    print("Ingrese cantidad de medicos (máximo 70): ")
    num_medicos = int(input())
    while num_medicos < 0 or num_medicos > 70:
        print("Cantidad no válida, ingrese otra cantidad: ")
        num_medicos = int(input())

    cargar_medicos(medicos, num_medicos)
    calcular_total_pacientes_por_grupo(medicos)
    listar_neumonologos_sin_vacunar_ninos(medicos)
    determinar_barrios_campanias(medicos)
