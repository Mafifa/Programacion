# STRUCT PARA LOS 10 PRODUCTOS
class Producto:
    def __init__(self):
        self.Codigo = ''
        self.Cuota = 0.0
        self.CantidadVendida = 0

# STRUCT PARA LA CAPACITACION
class Capacitacion:
    def __init__(self):
        self.Curso = ''
        self.Horas = 0
        self.Institucion = ''
        self.Costo = 0.0

# STRUCT PARA EL VENDEDOR
class Vendedor:
    def __init__(self):
        self.Nombre = ''
        self.Cedula = 0
        self.Direccion = ''
        self.Correo = ''
        self.CantidadCursos = 0
        self.Producto = [Producto() for _ in range(10)]
        self.Capacitacion = [Capacitacion() for _ in range(5)]

# Funcion para pedir numeros positivos
def menores_cero(num):
    while num < 0:
        print("Número no válido. Ingrese otro: ")
        num = float(input())
    return num

# Funcion para cargar los datos
def cargar_datos(vendedor):
    print("Ingresando datos para información")
    print("Nombre del vendedor: ")
    vendedor.Nombre = input()
    print("Cedula: ")
    vendedor.Cedula = int(input())
    print("Direccion: ")
    vendedor.Direccion = input()
    print("Correo: ")
    vendedor.Correo = input()
    print("Cantidad de Cursos  (Solo de 3 a 5 Cursos): ")
    vendedor.CantidadCursos = int(input())
    while vendedor.CantidadCursos < 3 or vendedor.CantidadCursos > 5:
        print("Número no válido. Ingrese otro: ")
        vendedor.CantidadCursos = int(input())

    print("Ingresando datos para los productos")
    for i in range(10):
        print("Codigo: ")
        vendedor.Producto[i].Codigo = input()

        print("Cantidad: ")
        vendedor.Producto[i].CantidadVendida = menores_cero(int(input()))

        print("Cuota: ")
        vendedor.Producto[i].Cuota = menores_cero(float(input()))

    for j in range(5):
        print("Nombre del curso: ")
        vendedor.Capacitacion[j].Curso = input()

        print("Cantidad de horas del curso: ")
        vendedor.Capacitacion[j].Horas = menores_cero(int(input()))

        print("Nombre de la institucion: ")
        vendedor.Capacitacion[j].Institucion = input()

        print("Costo del curso en Bs: ")
        vendedor.Capacitacion[j].Costo = menores_cero(float(input()))

# Funcion para ver cuál producto no cumple con la cuota
def mostrar_producto_sin_cuota(vendedor):
    print(f"Producto sin cubrir la cuota para el vendedor {vendedor.Nombre}:")
    for i in range(10):
        if vendedor.Producto[i].CantidadVendida < vendedor.Producto[i].Cuota:
            print(f"El producto: {vendedor.Producto[i].Codigo} no cumple la cuota")

# Funcion para encontrar al vendedor con más dinero invertido en cursos
def mas_inversion_cursos(vendedores):
    inversion_total = 0.0
    mayor_inversion = 0.0
    vendedor_indice = 0

    for i in range(20):
        for j in range(vendedores[i].CantidadCursos):
            inversion_total += vendedores[i].Capacitacion[j].Costo
        if inversion_total > mayor_inversion:
            mayor_inversion = inversion_total
            vendedor_indice = i
    print(f"El vendedor con mayor inversión en cursos es {vendedores[vendedor_indice].Nombre}")
    print(f"Con una cantidad de dinero invertida de: {mayor_inversion}")

def producto_mas_vendido(vendedores):
    indice_producto = 0
    indice_vendedor = 0
    cantidad_mayor = 0

    for i in range(20):
        for j in range(10):
            if vendedores[i].Producto[j].CantidadVendida > cantidad_mayor:
                cantidad_mayor = vendedores[i].Producto[j].CantidadVendida
                indice_vendedor = i
                indice_producto = j
    print(f"El producto más vendido es: {vendedores[indice_vendedor].Producto[indice_producto].Codigo}")

# Funcion para buscar curso por nombre
def mostrar_info_curso(vendedores, opc):
    print(f"Instituciones que ofrecen el curso {opc} y su costo")
    for i in range(20):
        for j in range(vendedores[i].CantidadCursos):
            if vendedores[i].Capacitacion[j].Curso == opc:
                print(f"Vendedor: {vendedores[i].Nombre}")
                print(f"Institucion: {vendedores[i].Capacitacion[j].Institucion}")
                print(f"Costo: {vendedores[i].Capacitacion[j].Costo}")

if __name__ == "__main__":
    vendedores = [Vendedor() for _ in range(20)]
    opc = ''

    for i in range(20):
        cargar_datos(vendedores[i])

    # Llamada a las funciones creadas
    for i in range(20):
        mostrar_producto_sin_cuota(vendedores[i])

    producto_mas_vendido(vendedores)

    mas_inversion_cursos(vendedores)

    print("Buscar curso por nombre")
    while opc != '0':
        print("Escriba el nombre del curso a buscar o escriba '0' para salir")
        opc = input()
        if opc != '0':
            mostrar_info_curso(vendedores, opc)
