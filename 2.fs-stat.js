const fs = require('node:fs') //? A partir de node 16, se recomienda poner "node:"

const stats = fs.statSync('./archivo.txt');

console.log(
    stats.isFile(), //* Si es un fichero
    stats.isDirectory(), //* Si es un directorio
    stats.isSymbolicLink(), //* Si es un enlace simbólico
    stats.size, //* Tamaño en bytes
)