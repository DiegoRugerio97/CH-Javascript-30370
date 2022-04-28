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

// Constantes para calculo de retencion de impuestos
class limite{
    constructor(limiteInferior,limiteSuperior, cuotaFija, porcentaje){
        this.limiteInferior = limiteInferior;
        this.limiteSuperior = limiteSuperior;
        this.cuotaFija = cuotaFija;
        this.porcentaje = porcentaje;
    }
}

const LIMITES_ISR = [new limite(0, 644.58, 0, .0192),
                    new limite(644.58, 5470.92, 12.38, 0.064),
                    new limite(5470.92, 9614.66, 321.26, 0.1088),
                    new limite(9614.66, 11176.62, 772.1, 0.16),
                    new limite(11176.62, 13381.47, 1022.01, 0.1792),
                    new limite(13381.47, 26988.5, 1417.12, 0.2136),
                    new limite(26988.5, 42537.58, 4323.58, 0.2352),
                    new limite(42537.58, 81211.25, 7980.73, 0.3),
                    new limite(81211.25, 108281.67, 19582.83, 0.32),
                    new limite(108281.67, 324845.01, 28245.36, 0.34),
                    new limite(324845.01, Infinity, 101876.9, 0.35)];

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
    let limiteAsignado;
    let salarioMensual;
    while (!mayorCero) {
        salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
        if (salarioMensual >= 0) {
            for(let limite of LIMITES_ISR){
                if(salarioMensual > limite.limiteInferior && salarioMensual <= limite.limiteSuperior){
                    limiteAsignado = limite;
                }
            }
            mayorCero = true;
        }
        else {
            alert("Por favor introduce un valor mayor a 0.");
        }
    }
    let retencion = Math.round(((salarioMensual - limiteAsignado.limiteInferior) * limiteAsignado.porcentaje) + limiteAsignado.cuotaFija);
    let mensaje = `
    Con un sueldo mensual de $${salarioMensual},
    tu retención de ISR según la ley federal de trabajo es de:
    $${retencion}, resultando en un ingreso de $${salarioMensual - retencion}.
    `;
    return mensaje;

}

// ****************************************************************************************************************+
// Funcion para el calculo de la vacaciones.
const calcularVacaciones = () => {

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