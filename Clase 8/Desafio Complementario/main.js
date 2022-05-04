// Calculadora financiera para Personas Fisicas
// Calculos a implementar

// 23/04/2022
// Calculo de Aguinaldo - IMPLEMENTADO
// Calculo de Retencion de impuestos - IMPLEMENTADO
// Calculo de Vacaciones - CAMBIO A CALCULO DE DECLARACION ANUAL
// Declaracion Anual 

// *********************************************************************************************************************




// Constantes

const DIAS_MES = 30.5;
const DIAS_ANIO = 365;

// Constantes para calculo de retencion de impuestos
// Clase limite
class limite {
    constructor(limiteInferior, limiteSuperior, cuotaFija, porcentaje) {
        this.limiteInferior = limiteInferior;
        this.limiteSuperior = limiteSuperior;
        this.cuotaFija = cuotaFija;
        this.porcentaje = porcentaje;
        this.retencion;
    }
    calcularRetencion(salarioMensual) {
        this.retencion = Math.round(((salarioMensual - this.limiteInferior) * this.porcentaje) + this.cuotaFija);
    }
}

// Array de objetos limite
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
    while (!mayorCero) {
        salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
        if (salarioMensual <= 0) {
            alert("Por favor introduce un valor mayor a 0.");
        }
        else {
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
    // Variable para la validacion
    let mayorCero = false;
    // Variable para guardar el objeto limite despues de segmentar el salario
    let limiteAsignado;
    // Variable para guardar el salario mensual del usuario
    let salarioMensual;
    while (!mayorCero) {
        salarioMensual = inputInt("¿De cuanto es tu salario mensual en pesos (MXN)?");
        if (salarioMensual >= 0) {
            // Implementacion de logica de segmentado utilizando un array de objetos limite.
            limiteAsignado = LIMITES_ISR.find((lim) => { return salarioMensual > lim.limiteInferior && salarioMensual <= lim.limiteSuperior });
            // Metodo para el calculo de la retencion.
            limiteAsignado.calcularRetencion(salarioMensual);
            mayorCero = true;
        }
        else {
            alert("Por favor introduce un valor mayor a 0.");
        }
    }
    let mensaje = `
    Con un sueldo mensual de $${salarioMensual},
    tu retención de ISR según la ley federal de trabajo es de:
    $${limiteAsignado.retencion}, resultando en un ingreso de $${salarioMensual - limiteAsignado.retencion}.
    `;
    return mensaje;
}

// Funcion para crear la tabla en HTML con JS
const crearTablaLimites = (arrayLimites) => {
    let tableBody = document.getElementById("tableBodySegmentos");
    arrayLimites.forEach((limite) => {
        let tableRow = document.createElement("tr");
        let contenidoRow = `<th scope="row">$ ${limite.limiteInferior}</th>
        <td>$ ${limite.limiteSuperior}</td>
        <td>$ ${limite.cuotaFija}</td>
        <td>${(limite.porcentaje * 100).toFixed(2)}%</td>`;
        tableRow.innerHTML = contenidoRow;
        tableBody.append(tableRow);
    });
}


// ****************************************************************************************************************+
// Funcion para el calculo de la vacaciones.
// Clase para ingresos
class Ingreso {
    constructor(concepto, mes, monto) {
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;
    }
}

// Clase para gasto deducible
class GastoDeducible {
    constructor(concepto, mes, monto) {
        this.concepto = concepto;
        this.mes = mes;
        this.monto = monto;
    }
}

// Funciones auxiliares para la declaracion anual
// Registrar gastos deducibles
const registrarGastoDeducible = (arrayGastos) => {
    let gasto = new GastoDeducible(inputString("Concepto del gasto"),
        inputString("Mes donde se realizo el gasto"),
        inputFloat("Monto facturado del gasto deducible"));
    arrayGastos.push(gasto);
}

// Registrar ingresos
const registrarIngreso = (arrayIngreso) => {
    let ingreso = new Ingreso(inputString("Concepto del ingreso"),
        inputString("Mes donde se obtuvo el ingreso"),
        inputFloat("Monto facturado del ingreso"));
    arrayIngreso.push(ingreso);
}

// Reportar las listas
const reportar = (array) => {
    let mensaje = "";
    if (array.length > 0) {
        array.forEach(elem => {
            mensaje += `Concepto: ${elem.concepto} - Mes: ${elem.mes} - Monto: $${elem.monto} \n`;
        });
    }
    else {
        mensaje = "Sin conceptos registrados."
    }
    return mensaje;

}

// Obtener la diferencia para determinar si es necesario realizar el pago de ISR
const compararAcumulados = (arrayIngresos, arrayGastos) => {
    const acumuladoIngresos = arrayIngresos.reduce((acumulado, ingreso) => acumulado + ingreso.monto, 0);
    const acumuladoGastos = arrayGastos.reduce((acumulado, gasto) => acumulado + gasto.monto, 0);
    const diferencia = Math.abs(acumuladoIngresos - acumuladoGastos);
    return { acumuladoIngresos: acumuladoIngresos, acumuladoGastos: acumuladoGastos, diferencia: diferencia };
}

// Reporte de resultados
const reportarResultados = (resultado) => {
    let mensaje = `Con un acumulado de ingresos de $${resultado.acumuladoIngresos}
Un acumulado de gastos deducibles de $${resultado.acumuladoGastos}
Una diferencia de $${resultado.diferencia}`;
    return mensaje;
}

// Funcion unificadora
const construirDeclaracionAnual = (arrayIngresos, arrayGastos) => {
    alert(reportar(arrayIngresos));
    alert(reportar(arrayGastos));
    if (arrayGastos.length > 0 && arrayIngresos.length > 0) {
        let resultado = compararAcumulados(arrayIngresos, arrayGastos);
        alert(reportarResultados(resultado));
    }
    else {
        alert("Favor de registrar ingresos y gastos");
    }
}


const calcularDeclaracionAnual = () => {
    let ingresos = [];
    let gastosDeducibles = [];
    let salir = false;
    let submenu = `
        Declaracion Anual
        Elije una opción para empezar a calcular tu declaración anual.
        Selecciona un tipo de concepto a registrar.
        G - Gasto deducible
        I - Ingreso
        Introduce 'C' para continuar o 'S' para salir.
        `;
    do {
        let opcionSeleccionada = inputString(submenu);
        switch (opcionSeleccionada) {
            case 'G':
                registrarGastoDeducible(gastosDeducibles);
                break;
            case 'g':
                registrarGastoDeducible(gastosDeducibles);
                break;
            case 'I':
                registrarIngreso(ingresos);
                break;
            case 'i':
                registrarIngreso(ingresos);
                break;
            case 'C':
                construirDeclaracionAnual(ingresos, gastosDeducibles);
                break;
            case 'c':
                construirDeclaracionAnual(ingresos, gastosDeducibles);
                break;
            case 'S':
                salir = true;
                break;
            case 's':
                salir = true;
                break;
            default:
                alert("Por favor, introduzca una opción válida.")
                break;
        }
    } while (!salir)
}


let salirMenu = false;
let menu = `
    Bienvenido a la calculadora fiscal.
    Elije una opción para empezar el calculo del concepto.
    A - Aguinaldo.
    R - Retencion del ISR del salario.
    D - Declaración anual.
    T - Creacion de tablas de limite.
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
        case 'D':
            calcularDeclaracionAnual();
            break;
        case 'd':
            calcularDeclaracionAnual();
            break;
        case 'S':
            salirMenu = true;
            break;
        case 's':
            salirMenu = true;
            break;
        case 't':
            crearTablaLimites(LIMITES_ISR);
            alert("Tablas creadas en tab Retencion");
            break;
        case 'T':
            crearTablaLimites(LIMITES_ISR);
            alert("Tablas creadas en tab Retencion");
            break;
        default:
            alert("Por favor, introduzca una opción válida.")
            break;
    }


} while (!salirMenu);