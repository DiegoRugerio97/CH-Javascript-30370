// Juego de adivinar un numero
// Funciona bajo el principio de la busqueda binaria.

// Bienvenida al menu del juego
let menuInicial = `
    Bienvenido al juego de números
    Piensa en un número entre 1 y 100...
    Ahora, pulsa 'Aceptar' para empezar el juego!
`;
let seguirJuego = true;
alert(menuInicial);
// Se entra al loop principal
do {
    // Inicializacion de variables
    let continuar = true;
    // Se establacen los limites para el juego
    let limiteInferior = 1;
    let limiteSuperior = 100;
    let numero;
    let menu;
    // Loop secundario, el cual se ejecutara hasta que se encuentre el numero seleccionado
    while (continuar) {
        // Calculo del numero
        numero = Math.round((limiteSuperior + limiteInferior - 1) / 2);
        // Se presenta el menu para ir acotando el numero
        menu = `
        ¿Acaso tu número es ${numero}?
        ¡Teclea Mayor, Menor o Exacto para continuar con el juego!`
        let respuesta = prompt(menu);
        //  En caso de presentar el numero, se sale del ciclo
        if (respuesta == "exacto" || respuesta == "Exacto") {
            continuar = false;
        }
        // Se acota el numero cambiando los limites
        else if (respuesta == "mayor" || respuesta == "Mayor") {
            limiteInferior = numero + 1;
        }
        else if (respuesta == "menor" || respuesta == "Menor") {
            limiteSuperior = numero - 1;
        }
        // En caso de no introducir las opciones proporcionadas, se regresa al inicio y se muestra un mensaje de error.
        else {
            alert("¡Comando no reconocido!");
        }
    }
    // Cuando se sale del loop secundario, se le pregunta al usuario si quiere continuar.
    menuInicial = `
    ¡Gracias por jugar!
    Para continuar jugando, ingresa "Continuar", o cualquier otra tecla para salir.
    `;
    let respuestaContinuar = prompt(menuInicial);
    if (respuestaContinuar != "Continuar" && respuestaContinuar != "continuar") {
        seguirJuego = false;
    }
} while (seguirJuego);
// FIN
