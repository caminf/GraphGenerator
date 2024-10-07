import { createCanvas } from 'canvas';
import * as fs from 'fs';

export const generate = (a: number, i: number, d: number, outputPath: string) => { 
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext('2d');

    // Dibuja los ejes y el gráfico
    ctx.fillStyle = 'black';
    ctx.fillRect(10, 10, 380, 380);

    // Dibuja el gráfico basándose en las métricas A, I y D
    ctx.beginPath();
    ctx.arc(a * 400, i * 400, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Guarda la imagen en la carpeta de salida
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(`${outputPath}/graph.png`, buffer);
}