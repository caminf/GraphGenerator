import { Metric } from '../strategies/Metric';
import { Abstraction } from '../strategies/Abstraction';
import { Instability } from '../strategies/Instability';
import { Distance } from '../strategies/Distance';
import { GraphGenerator } from '../services/GraphGenerator';
import { Scanner } from '../services/Scanner';

export class Kernel {
    private strategies: Metric[] = [];
    private results: { abstraction?: number, instability?: number, distance?: number } = {};

    constructor(
        private sourcePath: string, 
        private outputPath: string, 
        options: { a: boolean, i: boolean, d: boolean }
    ) {
        if (options.a) this.strategies.push(new Abstraction());
        if (options.i) this.strategies.push(new Instability());
        if (options.d && options.a && options.i) {
            this.strategies.push(new Distance(new Abstraction(), new Instability()));
        } else if (options.d) {
            console.error('Para calcular la métrica D, tanto A como I deben estar habilitados.');
            process.exit(1);
        }
    }

    public async run(): Promise<void> {
        await Scanner.scan(this.sourcePath);

        this.strategies.forEach(strategy => {
            const result = strategy.calculate();
            console.log(`Resultado de la métrica ${strategy.constructor.name}: ${result}`);
            
            if (strategy instanceof Abstraction) this.results.abstraction = result;
            if (strategy instanceof Instability) this.results.instability = result;
            if (strategy instanceof Distance) this.results.distance = result;
        });

        if (this.results.abstraction !== undefined && this.results.instability !== undefined && this.results.distance !== undefined) {
            GraphGenerator.generateGraph(
                this.results.abstraction,
                this.results.instability,
                this.results.distance,
                this.outputPath
            );
            console.log(`Gráfico generado en ${this.outputPath}/graph.png`);
        } else {
            console.error('No se pudo generar el gráfico debido a métricas incompletas.');
        }
    }
}
