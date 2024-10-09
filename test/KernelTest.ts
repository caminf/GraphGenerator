import { Kernel } from '../src/core/Kernel';

describe('Kernel', () => {
    it('should initialize with valid metrics options', () => {
        const kernel = new Kernel('../source', './generatedGraphs', { a: true, i: true, d: true });
        expect(kernel).toBeInstanceOf(Kernel);
    });

    it('should throw an error if necessary metrics are missing for Distance', () => {
        expect(() => new Kernel('../source', './generatedGraphs', { a: true, i: false, d: true }))
            .toThrow('Faltan los parámetros necesarios');
    });
});
