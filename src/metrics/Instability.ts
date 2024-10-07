import { Metric } from './Metric';

export class Instability extends Metric {

    constructor(sourceCode: string[]) {
        super(sourceCode);
    }

    public calculate(): number {
        let result = 0;
        let efferentCount = 0;
        let afferentCount = 0;

        this.sourceCode.forEach((file) => {
        
        });
        result = efferentCount / (efferentCount + afferentCount);

        return result;
    }
}