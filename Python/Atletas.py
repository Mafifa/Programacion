

# Estructura para la información de los jueces
class Juez:
    def __init__(self):
        self.nombre = ''
        self.pais = ''
        self.puntaje = 0.0

# Estructura para la información de los saltos de un atleta
class Salto:
    def __init__(self):
        self.dificultad = ''  # A, B, C o D
        self.puntaje = 0.0

# Estructura para la información de un atleta
class Atleta:
    def __init__(self):
        self.pais = ''
        self.nombre = ''
        self.edad = 0
        self.intentos = [Salto() for _ in range(3)]
        self.puntajeTotal = 0.0

# Función para cargar la información de un atleta
def cargar_atleta(atleta):
    atleta.pais = input("Ingrese el país del atleta: ")
    atleta.nombre = input("Ingrese el nombre del atleta: ")
    atleta.edad = int(input("Ingrese la edad del atleta: "))

    for i in range(3):
        print(f"Salto #{i + 1}:")
        atleta.intentos[i].dificultad = input("Dificultad del salto (A, B, C o D): ")
        atleta.intentos[i].puntaje = float(input("Puntaje otorgado (0 a 10): "))

# Función para calcular el puntaje total de un atleta
def calcular_puntaje(atleta):
    puntajes = [salto.puntaje for salto in atleta.intentos]

    # Eliminar el puntaje más alto y el puntaje más bajo
    min_puntaje = min(puntajes)
    max_puntaje = max(puntajes)

    min_index = puntajes.index(min_puntaje)
    max_index = puntajes.index(max_puntaje)

    puntajes[min_index] = 0  # Eliminar el puntaje más bajo
    puntajes[max_index] = 0  # Eliminar el puntaje más alto

    # Calcular el puntaje total
    puntaje_total = sum(puntajes)

    # Multiplicar por el grado de dificultad
    dificultad = atleta.intentos[0].dificultad
    if dificultad == 'A':
        puntaje_total *= 0.45
    elif dificultad == 'B':
        puntaje_total *= 0.70
    elif dificultad == 'C':
        puntaje_total *= 0.85
    elif dificultad == 'D':
        puntaje_total *= 1.2
    else:
        print("Dificultad no válida.")
        return

    atleta.puntajeTotal = puntaje_total

# Función para mostrar atletas que no realizaron saltos con dificultad B
def mostrar_atletas_sin_salto_b_dificultad(atletas, num_atletas):
    print("Atletas que no realizaron saltos con dificultad B:")
    for i in range(num_atletas):
        tiene_salto_b_dificultad = not any(salto.dificultad == 'B' for salto in atletas[i].intentos)

        if not tiene_salto_b_dificultad:
            print(f"Nombre: {atletas[i].nombre}, País: {atletas[i].pais}")

# Función para mostrar jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto
def mostrar_jueces_puntaje_mayor(atletas, jueces, num_atletas, num_jueces):
    print("Jueces que otorgaron puntaje mayor de 8.75 a su mismo país en el primer salto:")
    for i in range(num_atletas):
        for j in range(num_jueces):
            if atletas[i].pais == jueces[j].pais and atletas[i].intentos[0].puntaje > 8.75:
                print(f"Nombre del Juez: {jueces[j].nombre}, País del Juez: {jueces[j].pais}")

# Función principal
def main():
    cantidad_atletas = int(input("Ingrese cantidad de atletas (máximo 30): "))
    cantidad_jueces = int(input("Ingrese cantidad de jueces (máximo 9): "))

    if not 0 <= cantidad_atletas <= 30 or not 0 <= cantidad_jueces <= 9:
        print("Ingrese una cantidad válida.")
        return

    atletas = [Atleta() for _ in range(cantidad_atletas)]
    jueces = [Juez() for _ in range(cantidad_jueces)]

    # Cargar información de los atletas
    for i in range(cantidad_atletas):
        print(f"Datos del atleta #{i + 1}:")
        cargar_atleta(atletas[i])
        calcular_puntaje(atletas[i])
        print("------------------------------------")

    # Cargar información de los jueces
    for i in range(cantidad_jueces):
        print(f"Datos del juez #{i + 1}:")
        jueces[i].nombre = input("Ingrese el nombre del juez: ")
        jueces[i].pais = input("Ingrese el país del juez: ")
        jueces[i].puntaje = float(input("Ingrese el puntaje otorgado por el juez (0 a 10): "))
        print("------------------------------------")

    # Ejemplo de uso de funciones
    mostrar_atletas_sin_salto_b_dificultad(atletas, cantidad_atletas)
    print("------------------------------------")
    mostrar_jueces_puntaje_mayor(atletas, jueces, cantidad_atletas, cantidad_jueces)

if __name__ == "__main__":
    main()
