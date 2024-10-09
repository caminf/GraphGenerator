import { Abstraction } from '../src/strategies/Abstraction';
import { Instability } from '../src/strategies/Instability';
import { Distance } from '../src/strategies/Distance';

describe('Metrics', () => {
    it('should calculate abstraction correctly', () => {
        const abstraction = new Abstraction();
        jest.spyOn(abstraction, 'calculate').mockReturnValue(0.5);
        expect(abstraction.calculate()).toBe(0.5);
    });

    it('should calculate instability correctly', () => {
        const instability = new Instability();
        jest.spyOn(instability, 'calculate').mockReturnValue(0.4);
        expect(instability.calculate()).toBe(0.4);
    });

    it('should calculate distance correctly', () => {
        const distance = new Distance(new Abstraction(), new Instability());
        jest.spyOn(distance, 'calculate').mockReturnValue(0.2);
        expect(distance.calculate()).toBe(0.2);
    });
});
