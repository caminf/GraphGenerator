import { Scanner } from '../src/services/Scanner';

describe('Scanner', () => {
    beforeEach(() => {
        Scanner['abstractCount'] = 0;
        Scanner['concreteCount'] = 0;
        Scanner['classDependencies'].clear();
        Scanner['packageDependencies'].clear();
    });

    it('should correctly count abstract and concrete classes', async () => {
        await Scanner.scan('./test/mockJavaProject');
        expect(Scanner.countAbstractClasses()).toBeGreaterThan(0);
        expect(Scanner.countConcreteClasses()).toBeGreaterThan(0);
    });

    it('should return correct dependencies for classes', async () => {
        await Scanner.scan('./test/mockJavaProject');
        const classDeps = Scanner.getClassDependencies();
        expect(classDeps.size).toBeGreaterThan(0);
    });
});
