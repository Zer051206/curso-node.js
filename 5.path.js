const path = require('node:path')

// ? Unir rutas con path.join
// './content/subfolder/test.txt' //! X

const filePath = path.join('content', 'subfolder', 'test.txt') //* ✔
console.log(filePath)

// ? Barras:
//* -> Unix /
//* -> Windows \

//! Como ver la separacion de las rutas de tu sistema operativo:

console.log('Como se separan las rutas en tu OS:', path.sep)

// ? Saber el nombre del fichero con la extension
const base = path.basename('/tmp/miguel-secret-files/password.txt')
console.log('Nombre del fichero con la extension:', base)

// ? Saber el nombre del fichero sin la extension
const filename = path.basename('/tmp/miguel-secret-files/password.txt', '.txt')
console.log('Nombre del fichero sin la extension:', filename)

// ? Saber la extension del fichero
const extension = path.extname('my.super.image.png')
console.log('Saber la extension del archivo:', extension)
