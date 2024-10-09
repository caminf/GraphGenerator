import { Metric } from './Metric';
import { Scanner } from '../services/Scanner';

export class Instability implements Metric {

    public calculate(): number {
        const packageMetrics = Scanner.getPackageDependencies();
        
        let totalInstability = 0;
        let packageCount = 0;
        let packageTotalInstability;

        for (const [, metrics] of packageMetrics) {
            const { efferent, afferent } = metrics;
            const packageInstability = this.calculateInstability(efferent, afferent);
            totalInstability += packageInstability;
            packageCount++;
        }

        return packageTotalInstability === 0 ? 0 : totalInstability / packageCount;
    }

    private calculateInstability(efferent: number, afferent: number): number {
        const total = efferent + afferent;
        return total === 0 ? 0 : efferent / total;
    }

    public calculateForClass(className: string): number {
        const classMetrics = Scanner.getClassDependencies().get(className);
        if (!classMetrics) {
            return 0;
        }

        const { efferent, afferent } = classMetrics;
        return this.calculateInstability(efferent, afferent);
    }
}
