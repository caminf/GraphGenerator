import { Metric } from './Metric';

export class Distance extends Metric {

    private abstraction: number;
    private instability: number;

    constructor(abstraction: number, instability: number, sourceCode: string[]) {
        super(sourceCode);
        this.abstraction = abstraction;
        this.instability = instability;
    }

    public calculate(): number {
        return parseFloat(
            (this.abstraction + this.instability - 
                (this.abstraction * this.instability)
            ).toFixed(2));
    }
}