import { Simulation } from './simulation';

const args = process.argv.slice(2);

if (args.length < 2) {
    console.error('Por favor, proporciona dos argumentos.');
    process.exit(1);
}

const PARTNER_NUMBER = parseInt(args[0], 10);
const CANT_RONDAS_ENTRE_ANUNCIOS = parseInt(args[1], 10);

if (isNaN(PARTNER_NUMBER) || isNaN(CANT_RONDAS_ENTRE_ANUNCIOS)) {
    console.error('Ambos argumentos deben ser números.');
    process.exit(1);
}

console.log(`Partner n°: ${PARTNER_NUMBER}`);
console.log(`Cantidad de anuncios: ${CANT_RONDAS_ENTRE_ANUNCIOS}`);

const totalTime = 50000000;

const simulation = new Simulation(totalTime, CANT_RONDAS_ENTRE_ANUNCIOS, PARTNER_NUMBER);
simulation.run();
