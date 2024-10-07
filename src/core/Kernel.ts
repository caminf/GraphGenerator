import { scan } from './Scanner';
import { Abstraction, calculate } from '../metrics/Abstraction';
import { Instability, calculate } from '../metrics/Instability';
import { Distance, calculate } from '../metrics/Distance';
import { generate } from '../graph/GraphGenerator';

export class Kernel {
    public async run(sourcePath: string, outputPath: string, a: boolean, i: boolean, d: boolean){
        let Metrics = [];
        const sourceCode = await scan(sourcePath);
        let abstraction = new Abstraction(sourceCode);
        abstraction.calculate();
        let instability = new Instability(sourceCode);
        instability.calculate();
        let distance = new Distance(abstraction, instability, sourceCode);
        distance.calculate();
        if (a) {
            abstraction = calculate(sourceCode);
            console.log(`Grado de Abstracción: ${abstraction}`);
        }
        if (i) {
            instability = calculate(sourceCode);
            console.log(`Inestabilidad: ${instability}`);
        }
        if (a && i && d) {
            distance = calculate(abstraction, instability, sourceCode);
            console.log(`Distancia a la secuencia principal: ${distance}`);
            generate(abstraction, instability, distance, outputPath);
        }
    }
}