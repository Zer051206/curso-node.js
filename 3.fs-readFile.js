//! ESTO SOLO EN LOS MÓDULOS NATIVOS 
//! QUE NO TIENEN PROMESAS NATIVAS

//? const { promisify } = require('node:util)
//? const readFilePromise = promisify(fs.readFiles)

const fs = require('node:fs')

console.log("Leyendo el primer archivo...")
fs.readFile('./archivo.txt', 'utf-8', (err, text) => { //* <- Ejecutas este callback
    console.log("Primer texto:",text)
}) 

console.log("Haciendo cosas mientras lee el archivo...")

console.log("Leyendo el segundo archivo...")
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
    console.log("Segundo texto:",text)
})

