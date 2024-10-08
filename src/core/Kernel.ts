import { Metric } from '../strategies/Metric';
import { Abstraction } from '../strategies/Abstraction';
import { Instability } from '../strategies/Instability';
import { Distance } from '../strategies/Distance';

export class Kernel {

    private strategies: Metric[] = [];

    constructor(sourcePath: string, outputPath: string, options: {a: boolean, i: boolean, d: boolean}) {
        if (options.a) this.strategies.push(new Abstraction());
        if (options.i) this.strategies.push(new Instability());
        if (options.d && options.a && options.i) {
            this.strategies.push(new Distance(new Abstraction(), new Instability()));
        } else {
            // error('Faltan los parámetros necesarios: -a=true ó -i=true');
            process.exit(1);
        }
    }

    public run(): void {
        this.strategies.forEach(strategy => {
            const result = strategy.calculate();
            console.log(`Resultado de la métrica: ${result}`);
        });
    }
}
