const fs = require('fs');

// Definición de constantes
const DAYS_IN_YEAR = 365;
const MEAN_ROUNDS = 22; // Promedio de rondas por juego de truco a 30 puntos
const STD_ROUNDS = 2;  // Desviación estándar de las rondas por juego de truco

// Función para generar un número aleatorio con distribución normal
function randomNormal(mean, std) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random(); // Evitar 0
    while (v === 0) v = Math.random(); // Evitar 0
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * std + mean;
}

// Creación de un array con fechas correctas
let dates = [];
let startDate = new Date(2023, 0, 1);  // 1/1/2023
for (let i = 0; i < DAYS_IN_YEAR; i++) {
    let date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString('es-AR'));
}

// Generación de cantidad de rondas promedio por día
let roundsData = [];
for (let day = 0; day < DAYS_IN_YEAR; day++) {
    let rounds = Math.max(0, Math.round(randomNormal(MEAN_ROUNDS, STD_ROUNDS))); // Evitar valores negativos
    roundsData.push({
        Fecha: dates[day],
        Cantidad: rounds
    });
}

// Guardar los resultados en un archivo CSV
let csvContent = 'Fecha;Cantidad\n';
roundsData.forEach(row => {
    csvContent += `${row.Fecha};${row.Cantidad}\n`;
});

fs.writeFileSync('rondas_promedio_por_dia.csv', csvContent);
console.log('Archivo CSV generado con éxito.');
