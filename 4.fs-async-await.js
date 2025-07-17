const { readFile } = require('node:fs/promises')

//? IIFE = Inmediatly Invoked Function Expresion
;(
    async() => {
    console.log("Leyendo el primer archivo...")
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log("Primer texto:", text)
    
    console.log("Haciendo cosas mientras lee el archivo...")
    
    console.log("Leyendo el segundo archivo...")
    const text2 = await readFile('./archivo2.txt', 'utf-8')
    console.log("Segundo texto:", text2)
    }
)()

