import { Metric } from './Metric';
import { Scanner } from '../services/Scanner';

export class Abstraction implements Metric {

    public calculate(): number {
        const abstractCount = Scanner.countAbstractClasses();
        const concreteCount = Scanner.countConcreteClasses();

        if ((abstractCount + concreteCount) === 0) {
            return 0;
        }
        return abstractCount / (abstractCount + concreteCount);
    }

}

