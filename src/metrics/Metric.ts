export abstract class Metric{
    protected sourceCode: string[];

    constructor(sourceCode: string[]){
        this.sourceCode = sourceCode;
    }

    public abstract calculate(): number;
}