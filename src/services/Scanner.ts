import * as fs from 'fs';
import * as path from 'path';
// import { Logger } from '../utils/Logger';

export class Scanner {

    private static abstractCount: number = 0;
    private static concreteCount: number = 0;
    private static efferentCalls: number = 0;
    private static afferentCalls: number = 0;

    public static async scan(directory: string): Promise<void> {
        // Logger.info(`Escaneando la carpeta de código fuente: ${directory}`);
        await this.processDirectory(directory);
    }

    private static async processDirectory(directory: string): Promise<void> {
        const files = fs.readdirSync(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                await this.processDirectory(filePath);
            } else if (file.endsWith('.java')) {
                this.processJavaFile(filePath);
            }
        }
    }

    private static processJavaFile(filePath: string): void {
        const content = fs.readFileSync(filePath, 'utf-8');

        if (content.includes('abstract class') || content.includes('interface')) {
            this.abstractCount++;
        } else {
            this.concreteCount++;
        }

        const efferentCalls = this.getEfferentCalls(content);
        const afferentCalls = this.getAfferentCalls(content);

        this.efferentCalls += efferentCalls.length;
        this.afferentCalls += afferentCalls.length;
    }

    private static getEfferentCalls(content: string): string[] {
        //buscar
        const efferentMatches = content.match("") || [];
        return efferentMatches;
    }

    private static getAfferentCalls(content: string): string[] {
        //buscar
        const afferentMatches = content.match("") || [];
        return afferentMatches;
    }

    public static countAbstractClasses(): number {
        return this.abstractCount;
    }

    public static countConcreteClasses(): number {
        return this.concreteCount;
    }

    public static countEfferentCalls(): number {
        return this.efferentCalls;
    }

    public static countAfferentCalls(): number {
        return this.afferentCalls;
    }
}
