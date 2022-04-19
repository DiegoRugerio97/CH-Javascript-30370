
let menuInicial = `
    Bienvenido al juego de números
    Piensa en un número entre 1 y 100...
    Ahora, pulsa 'Aceptar' para empezar el juego!
`;
let seguirJuego = true;
alert(menuInicial);
do {
    let continuar = true;
    let limiteInferior = 1;
    let limiteSuperior = 100;
    let numero;
    let menu;
    while (continuar) {
        numero = Math.round((limiteSuperior + limiteInferior - 1) / 2);
        menu = `
        ¿Acaso tu número es ${numero}?
        ¡Teclea Mayor, Menor o Exacto para continuar con el juego!`

        let respuesta = prompt(menu);
        if (respuesta == "exacto" || respuesta == "Exacto") {
            continuar = false;
        }
        else if (respuesta == "mayor" || respuesta == "Mayor") {
            limiteInferior = numero + 1;
        }
        else if (respuesta == "menor" || respuesta == "Menor") {
            limiteSuperior = numero - 1;
        }
        else {
            alert("¡Comando no reconocido!");
        }
    }
    menuInicial = `
    ¡Gracias por jugar!
    Para continuar jugando, ingresa "Continuar", o cualquier otra tecla para salir.
    `;
    let respuestaContinuar = prompt(menuInicial);
    if (respuestaContinuar != "Continuar" && respuestaContinuar != "continuar") {
        seguirJuego = false;
    }
} while (seguirJuego);
