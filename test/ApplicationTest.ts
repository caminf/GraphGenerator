import { Application } from '../src/core/Application';

describe('Application', () => {
    it('should initialize with valid arguments', () => {
        const args = ['../source', './generatedGraphs', '-a=true', '-i=true', '-d=true'];
        const app = new Application(args);
        expect(app).toBeInstanceOf(Application);
    });

    it('should throw an error if required arguments are missing', () => {
        const args = ['../source', './generatedGraphs'];
        expect(() => new Application(args)).toThrow('Faltan los parámetros necesarios');
    });
});
