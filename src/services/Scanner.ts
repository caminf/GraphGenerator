import * as fs from 'fs';
import * as path from 'path';

export class Scanner {

    private static abstractCount: number = 0;
    private static concreteCount: number = 0;
    private static classDependencies: Map<string, { efferent: number, afferent: number }> = new Map();
    private static packageDependencies: Map<string, { efferent: number, afferent: number }> = new Map();


    public static async scan(directory: string): Promise<void> {
        console.log(`Escaneando la carpeta de código fuente: ${directory}`);
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
                const packageName = path.dirname(filePath);
                this.processJavaFile(filePath, packageName);
            }
        }
    }

    private static processJavaFile(filePath: string, packageName: string): void {
        const content = fs.readFileSync(filePath, 'utf-8');
        const className = path.basename(filePath, '.java');

        const efferentCalls = this.getEfferentCalls(content).length;
        const afferentCalls = this.getAfferentCalls(content).length;

        this.classDependencies.set(className, { efferent: efferentCalls, afferent: afferentCalls });

        const packageMetrics = this.packageDependencies.get(packageName) || { efferent: 0, afferent: 0 };
        packageMetrics.efferent += efferentCalls;
        packageMetrics.afferent += afferentCalls;
        this.packageDependencies.set(packageName, packageMetrics);

        if (content.includes('abstract class') || content.includes('interface')) {
            this.abstractCount++;
        } else {
            this.concreteCount++;
        }
    }

    private static getEfferentCalls(content: string): string[] {
        const efferentMatches = content.match(/new\s+\w+|extends\s+\w+|implements\s+\w+/g) || [];
        return efferentMatches;
    }

    private static getAfferentCalls(content: string): string[] {
        const afferentMatches = content.match(/\w+\s*\.\s*\w+\(/g) || [];
        return afferentMatches;
    }

    public static countAbstractClasses(): number {
        return this.abstractCount;
    }

    public static countConcreteClasses(): number {
        return this.concreteCount;
    }
    public static getClassDependencies(): Map<string, { efferent: number, afferent: number }> {
        return this.classDependencies;
    }

    public static getPackageDependencies(): Map<string, { efferent: number, afferent: number }> {
        return this.packageDependencies;
    }
}
