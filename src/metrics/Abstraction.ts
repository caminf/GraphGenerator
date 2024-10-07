import { Metric } from './Metric';

export class Abstraction extends Metric {

    constructor(sourceCode: string[]) {
        super(sourceCode);
    }

    public calculate(): number {
        let result = 0;
        let abstractCount = 0;
        let concreteCount = 0;

        this.sourceCode.forEach((file) => {
        if (file.includes('interface') || file.includes('abstract class')){
            abstractCount++
        } else {
            concreteCount++
        }
        });
        result = abstractCount / (abstractCount + concreteCount);

        return result;
    }
}