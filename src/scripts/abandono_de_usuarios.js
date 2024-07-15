const fs = require('fs');

// Definición de constantes
const DAYS_IN_YEAR = 365;
const MEAN_ABANDON = 0.001; // 0.1% de abandono por día
const STD_ABANDON = 0.0002; // 0.02% de desviación estándar

// Función para generar un número aleatorio con distribución normal
function randomNormal(mean, std) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Generación de porcentaje de abandono por día
let abandonRates = [];
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    abandonRates.push(Math.max(0, randomNormal(MEAN_ABANDON, STD_ABANDON))); // Evitar valores negativos
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
        Porcentaje: (abandonRates[index]).toFixed(4).replace(".", ",")
    };
});

// Guardar los resultados en un archivo CSV
let csvContent = 'Fecha;Porcentaje\n';
result.forEach(row => {
    csvContent += `${row.Fecha};${row.Porcentaje}\n`;
});

fs.writeFileSync('porcentaje_abandono_diario.csv', csvContent);
console.log('Archivo CSV generado con éxito.');
