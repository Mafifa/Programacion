//1. Depositar dinero
//2. Determinar numero de lineas para apostar
//3. Recoger una cantidad de apuestas
//4. Girar el traga monedas
//5. verificar si el usuario gano
//6. Dar al usuario lo ganado
//7. Jugar de nuevo

const prompt = require("prompt-sync")();

const FILAS = 3;
const COLUMNAS = 4;

const SIMBOLOS_CONTENEDOR = {
	"A": 2,
	"B": 4,
	"C": 6,
	"D": 8
}

const VALOR_SIMBOLO = {
	"A": 5,
	"B": 4,
	"C": 3,
	"D": 2,
}

const depositar = () => {
	while (true) {
		const depositarMonto = prompt("Ingrese monto del deposito: ");
		const numeroDepositoMonto = parseFloat(depositarMonto);

		if (isNaN(numeroDepositoMonto) || (numeroDepositoMonto <= 0)) {
			console.log("Monto del deposito invalido, intente de nuevo: ");
		} else {
			return numeroDepositoMonto;
		}
	}
};

const tomarNumeroDeLineas = () => {
	while (true) {
		const lineas = prompt("Ingrese numero de lineas (Maximo 3): ");
		const numeroDelineas = parseFloat(lineas);

		if (isNaN(numeroDelineas) || (numeroDelineas <= 0) || (numeroDelineas > 3)) {
			console.log("Cantidad no valida, ingrese una cantidad correcta: ")
		} else {
			return numeroDelineas;
		}
	}
}

const tomarBalance = (balance) => {
	while (true) {
		const apuesta = prompt("Ingrese cantdad de apuesta por linea : ");
		const numeroApuesta = parseFloat(apuesta);

		if (isNaN(numeroApuesta) || (numeroApuesta <= 0) || (numeroApuesta > (balance / lineas))) {
			console.log("Cantidad no valida, ingrese una cantidad correcta: ")
		} else {
			return numeroApuesta;
		}
	}
}

const spin = () => {
	const simbolos = [];
}

let balance = depositar();
const cantidadLineas = tomarNumeroDeLineas();
const apuesta = tomarApuesta(balance, cantidadLineas);