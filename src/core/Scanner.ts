import * as fs from 'fs';
import * as path from 'path';

export const scan = async (directoryPath: string): Promise<string[]> => {
    // Lógica para escanear un repositorio
    if (!fs.existsSync(directoryPath)) {
        throw new Error('El código fuente no existe en la ruta especificada.');
    }

    const files = fs.readdirSync(directoryPath);
    // Extraer archivos Java de la carpeta
    const javaFiles = files.filter((file: string)  => file.endsWith('.java'));
    
    // Leer los archivos y devolver su contenido
    return javaFiles.map((file: string)  => {
        const filePath = path.join(directoryPath, file);
        try {
            return fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            console.error(`Error al leer el archivo ${filePath}: ${(error as Error).message}`);
            return '';
        }
    });
};