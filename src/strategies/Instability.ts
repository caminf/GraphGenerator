import { Metric } from './Metric';
import { Scanner } from '../services/Scanner';

export class Instability implements Metric {

    public calculate(): number {
        const efferentCalls = Scanner.countEfferentCalls();
        const afferentCalls = Scanner.countAfferentCalls();
        const totalCalls = efferentCalls + afferentCalls;
        // agregar calculo de inestabilidad total del codigo
        if (totalCalls === 0) {
            return 0;
        }
        return efferentCalls / totalCalls;
    }

}