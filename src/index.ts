import { Application } from './core/Application';

const args = process.argv.slice(2);
const app = new Application(args);

app.run();
console.log("Iniciando escaneo...")