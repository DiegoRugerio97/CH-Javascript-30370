// Calculadora financiera para Personas Fisicas
// Calculos a implementar

// 23/04/2022
// Calculo de Aguinaldo - IMPLEMENTADO
// Calculo de Retencion de impuestos - IMPLEMENTADO
// Calculo de Vacaciones - SIN IMPLEMENTAR

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
    let mayorCero = false;
    let salarioMensual;
    while(!mayorCero){
        salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
        if(salarioMensual <= 0){
            alert("Por favor introduce un valor mayor a 0.");
        }
        else{
            mayorCero = true;
        }
    }
    let salarioDiario = salarioMensual / DIAS_MES;
    let diasAguinaldo = inputInt("¿Cuantos días de aguinaldo proporciona tu empresa?");
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
// ****************************************************************************************************************+
// Funcion para el calculo de la retencion del Impuesto sobre la renta del salario.
const calcularISR = () => {
    // Calculo de la retencion del ISR sobre el salario, basado en los limites establecidos por la ley federal del trabajo mexicana.
    // Funcion con muchas constantes, Plan -> Convertir en array de objetos para optimizar constantes.
    // Pasar logica de segmentado a una funcion aparte
    // Por el momento seran hardcodeadas.
    let mayorCero = false;
    let limiteInferior;
    let cuotaFija;
    let porcentaje;
    let salarioMensual;
    while (!mayorCero) {
        salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
        if (salarioMensual >= 0) {
            if (salarioMensual > 0 && salarioMensual <= 644.58) {
                limiteInferior = 0;
                cuotaFija = 0;
                porcentaje = 0.0192;
            }
            else if (salarioMensual > 644.58 && salarioMensual <= 5470.92) {
                limiteInferior = 644.58;
                cuotaFija = 12.38;
                porcentaje = 0.064;
            }
            else if (salarioMensual > 5470.92 && salarioMensual <= 9614.66) {
                limiteInferior = 5470.92;
                cuotaFija = 312.26;
                porcentaje = 0.1088;
            }
            else if (salarioMensual > 9614.66 && salarioMensual <= 11176.62) {
                limiteInferior = 9614.66;
                cuotaFija = 772.1;
                porcentaje = 0.16;
            }
            else if (salarioMensual > 11176.62 && salarioMensual <= 13381.47) {
                limiteInferior = 11176.62;
                cuotaFija = 1022.01;
                porcentaje = 0.1792;
            }
            else if (salarioMensual > 13381.48 && salarioMensual <= 26988.5) {
                limiteInferior = 13381.48;
                cuotaFija = 1417.12;
                porcentaje = 0.2136;
            }
            else if (salarioMensual > 26988.51 && salarioMensual <= 42537.58) {
                limiteInferior = 26988.51;
                cuotaFija = 4323.58;
                porcentaje = 0.2352;
            }
            else if (salarioMensual > 42537.59 && salarioMensual <= 81211.25) {
                limiteInferior = 42537.59;
                cuotaFija = 7980.73;
                porcentaje = 0.3;
            }
            else if (salarioMensual > 81211.26 && salarioMensual <= 108281.67) {
                limiteInferior = 81211.26;
                cuotaFija = 19582.83;
                porcentaje = 0.32;
            }
            else if (salarioMensual > 108281.67 && salarioMensual <= 324845.01) {
                limiteInferior = 108281.6;
                cuotaFija = 28245.36;
                porcentaje = 0.34;
            }
            else {
                limiteInferior = 324845.01;
                cuotaFija = 101876.91;
                porcentaje = 0.35;
            }
            mayorCero = true;
        }
        else {
            alert("Por favor introduce un valor mayor a 0.");
        }
    }
    let retencion = Math.round(((salarioMensual - limiteInferior) * porcentaje) + cuotaFija);
    let mensaje = `
    Con un sueldo mensual de $${salarioMensual},
    tu retención de ISR según la ley federal de trabajo es de:
    $${retencion}, resultando en un ingreso de $${salarioMensual - retencion}.
    `;
    return mensaje;

}

let salirMenu = false;
let menu = `
    Bienvenido a la calculadora fiscal.
    Elije una opción para empezar el calculo del concepto.
    A - Aguinaldo.
    R - Retencion del ISR del salario.
    V - Días de vacaciones.
    Introduce 'S' para salir.
`;

// Display del menu
do {
    let opcionSeleccionada = inputString(menu);
    switch (opcionSeleccionada) {
        case 'A':
            alert(`Te corresponde un aguinaldo de $${calcularAguinaldo()}.`);
            break;
        case 'a':
            alert(`Te corresponde un aguinaldo de $${calcularAguinaldo()}.`);
            break;
        case 'R':
            alert(calcularISR());
            break;
        case 'r':
            alert(calcularISR());
            break;
        case 'V':
            alert("Aun no implementado.");
            break;
        case 'v':
            alert("Aun no implementado.");
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