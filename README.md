# GraphGenerator

En una arquitectura de microkernel, el núcleo (o kernel) ofrece los servicios básicos mientras que las funcionalidades adicionales están implementadas como plugins o módulos. Para este caso, las métricas y el generador de gráfico serían los módulos, y el kernel se encarga de coordinar la ejecución de los mismos.

Instrucciones de arranque:

1. Clonar el repositorio

2. Instalar dependencias

3. Compilar proyecto

4. Ejecutar la aplicación 

npm run dev carpeta_codigo_fuente/ carpeta_donde_quedará_el_gráfico/ -a=true -i=true -d=true 