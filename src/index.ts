import { Simulation } from './simulation';

const totalTime = 50000;
const adsByGame = 1;

const simulation = new Simulation(totalTime, adsByGame);
simulation.run();
