import { GraphGenerator } from '../src/services/GraphGenerator';
import * as fs from 'fs';

jest.mock('fs');

describe('GraphGenerator', () => {
    it('should create a graph image file', () => {
        const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync');
        GraphGenerator.generateGraph(0.5, 0.5, 0.3, './generatedGraphs');
        expect(mockWriteFileSync).toHaveBeenCalledWith(expect.stringContaining('/graph.png'), expect.any(Buffer));
    });
});
