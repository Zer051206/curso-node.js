//! ESTO SOLO EN LOS MÓDULOS NATIVOS 
//! QUE NO TIENEN PROMESAS NATIVAS

//? const { promisify } = require('node:util)
//? const readFilePromise = promisify(fs.readFiles)

const fs = require('node:fs')

console.log("Leyendo el primer archivo...")
const text = fs.readFileSync('./archivo.txt', 'utf-8') 
console.log("Primer texto:",text)

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log("Segundo texto:",text2)
