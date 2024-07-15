const fs = require('fs');

// Definición de constantes
const DAYS_IN_YEAR = 365;
const MEAN_AU = 200;
const STD_AU = 40;

// Incrementos por periodos especiales
const SUMMER_VACATION_INCREMENT = 0.50;
const WINTER_VACATION_INCREMENT = 0.30;
const WEEKEND_INCREMENT = 0.20;

// Función para generar un número aleatorio con distribución normal
function randomNormal(mean, std) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Función para determinar si un día es fin de semana
function isWeekend(day) {
    return day % 7 === 5 || day % 7 === 6; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
}

// Función para determinar si es verano (15 de diciembre a 28 de febrero)
function isSummerVacation(day) {
    return (348 <= day && day <= 364) || (0 <= day && day <= 58);
}

// Función para determinar si es invierno (1 de julio a 31 de julio)
function isWinterVacation(day) {
    return 181 <= day && day <= 211;
}

// Generación de adquisición de usuarios por día
let auBase = [];
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    auBase.push(randomNormal(MEAN_AU, STD_AU));
}

// Aplicación de factores de modificación según la época del año
let auModified = [];
for (let day = 0; day < DAYS_IN_YEAR; day++) {
    let increment = 1.0;
    if (isSummerVacation(day)) {  // Vacaciones de verano
        increment += SUMMER_VACATION_INCREMENT;
    } else if (isWinterVacation(day)) {  // Vacaciones de invierno
        increment += WINTER_VACATION_INCREMENT;
    }
    if (isWeekend(day)) {  // Fin de semana
        increment += WEEKEND_INCREMENT;
    }
    auModified.push(auBase[day] * increment);
}

// Creación de un array con fechas correctas
let dates = [];
let startDate = new Date(2023, 0, 1);  // 1/1/2023
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString('es-AR'));
}

// Creación del resultado final
let result = dates.map((date, index) => {
    return {
        Fecha: date,
        Cantidad: Math.round(auModified[index]),
    };
});

// Guardar los resultados en un archivo CSV
let csvContent = 'Fecha;Cantidad\n';
result.forEach(row => {
    csvContent += `${row.Fecha};${row.Cantidad.toFixed(2).replace(".", ",")}\n`;
});

fs.writeFileSync('adquisicion_usuarios.csv', csvContent);
console.log('Archivo CSV generado con éxito.');
