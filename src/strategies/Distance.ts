import { Metric } from './Metric';      
import { Abstraction } from './Abstraction';
import { Instability } from './Instability';

export class Distance implements Metric {

    private abstraction: Abstraction;
    private instability: Instability;

    constructor(abstraction: Abstraction, instability: Instability) {
        this.abstraction = abstraction;
        this.instability = instability;
    }

    public calculate(): number {

        const A = this.abstraction.calculate();
        const I = this.instability.calculate();
        return Math.abs(A + I - 1);

    }
}