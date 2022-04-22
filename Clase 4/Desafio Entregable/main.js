// Calculadora financiera para Personas Fisicas
// Calculos a implementar

// Calculo de Aguinaldo - IMPLEMENTADO
// Calculo de Nomina
// Calculo de Vacaciones

// *********************************************************************************************************************
// Constantes

const DIAS_MES = 30.5;
const DIAS_ANIO = 365;


// *********************************************************************************************************************
// Funciones de utilidad
// Lectura de prompts, despues sera lectura de campos
// Float
const inputFloat = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (parseFloat(input)) {
            return parseFloat(input);
        }
        else {
            alert("Por favor, introduce un valor númerico.");
        }
    }
}
// Int
const inputInt = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (parseInt(input)) {
            return parseInt(input);
        }
        else {
            alert("Por favor, introduce un valor númerico.");
        }
    }
}
// String
const inputString = (mensajePrompt) => {
    while (true) {
        let input = prompt(mensajePrompt);
        if (isNaN(input)) {
            return input;
        }
        else {
            alert("Por favor, introduce un valor valido.");
        }
    }
}

// ****************************************************************************************************************+
// Funcion para el calculo del aguinaldo
const calcularAguinaldo = () => {
    // Si se ha trabajado minimo un año en la empresa
    // aguinaldo = salario diario * dias de aguinaldo (por ley en Mexico son 15 minimos, hay empresas que dan mas como prestacion)
    // Si no, se calculan los dias proporcionales basado en los dias trabajados.
    let salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
    let salarioDiario = salarioMensual / DIAS_MES;
    let diasAguinaldo = inputInt("¿Cuantos días de aguinaldo proporciona tu empresa?")
    let validacion = true;
    while (validacion) {
        let aniosEmpresa = inputString("¿Llevas trabajando más de un año en tu empresa?\n Responde 'Si' o 'No'");
        if (aniosEmpresa == 'Si' || aniosEmpresa == 'si' || aniosEmpresa == 'SI') {
            validacion = false;
            return Math.round(diasAguinaldo * salarioDiario);
        }
        else if (aniosEmpresa == 'No' || aniosEmpresa == 'no' || aniosEmpresa == 'NO') {
            let diasTrabajados = inputInt("¿Cuantos dias has trabajado en tu empresa?");
            let diasProporcionales = (diasTrabajados * diasAguinaldo) / DIAS_ANIO;
            validacion = false;
            return Math.round(diasProporcionales * salarioDiario);
        }
        else {
            alert("Por favor, introduce 'Si' o 'No'.");
        }
    }

}


let salirMenu = false;
let menu = `
    Bienvenido a la calculadora fiscal.
    Elije una opción para empezar el calculo del concepto.
    A - Aguinaldo.
    N - Nomina.
    V - Días de vacaciones.
    Introduce 'S' para salir.
`;

do {
    let opcionSeleccionada = inputString(menu);
    switch (opcionSeleccionada) {
        case 'A':
            alert(`Te corresponde un aguinaldo de $${calcularAguinaldo()}.`);
            break;
        case 'a':
            alert(`Te corresponde un aguinaldo de $${calcularAguinaldo()}.`);
            break;

        case 'S':
            salirMenu = true;
            break;
        case 's':
            salirMenu = true;
            break;
        default:
            alert("Por favor, introduzca una opción válida.")
            break;
    }


} while (!salirMenu);