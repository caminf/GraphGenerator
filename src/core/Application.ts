import { Kernel } from './Kernel';
export class Application {
    private kernel: Kernel;

    constructor(args: string[]) {
        const { sourcePath, outputPath, metricsOptions } = this.parseArguments(args);
        
        if (!sourcePath || !outputPath) {
            console.error('Faltan los parámetros necesarios. Uso: npm run dev <carpeta_codigo_fuente> <carpeta_donde_quedará_el_gráfico> -a=true -i=true -d=true');
            process.exit(1);
        }
        
        this.kernel = new Kernel(sourcePath, outputPath, metricsOptions); 
    }

    private parseArguments(args: string[]): { sourcePath: string; outputPath: string; metricsOptions: { a: boolean; i: boolean; d: boolean } } {
        
        const sourcePath = args[0];
        const outputPath = args[1];
        const calculateA = args.includes('-a=true');
        const calculateI = args.includes('-i=true');
        const calculateD = args.includes('-d=true');

        return {
            sourcePath,
            outputPath,
            metricsOptions: { a: calculateA, i: calculateI, d: calculateD }
        };
    }

    public async run(): Promise<void> {
        try {
            console.info('Inicializando la aplicación...');
            await this.kernel.run();
            console.info('Ejecución finalizada exitosamente.');
        } catch (error) {
            console.error(`Error en la aplicación: ${(error as Error).message}`);
        }
    }
}
