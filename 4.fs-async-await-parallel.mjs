import { readFile } from 'node:fs/promises'

Promise.all([ //? Es más rápido que asycn y await, ya que hace dos trabajos en paralelo.
    readFile('./archivo.txt', 'utf-8'),
    readFile('./archivo2.txt', 'utf-8')
]).then(([text, text2]) => {
    console.log("Primer texto:", text)
    console.log("Segundo texto:", text2)
})

