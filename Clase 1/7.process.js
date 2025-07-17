//! Process:

// ? Argumentos de entrada:
console.log(process.argv)

// ? Controlar el proceso y su salida

process.exit(0) //* Con 0 es que todo ha ido bien y termina
//* process.exit(1) Con 1 es que ha habido un error y queremos que salga

// ? Podemos controlar los eventos del proceso

process.on('exit', () => {
  // ? Limpiar los recursos cuando salga (process.exit)
})

// ? Current working directory
console.log(process.cwd()) //* Desde que carpeta hemos ejecutando el proceso no desde donde se ejecuta el archivo

// ? Variables de entorno
console.log(process.env) //* Variables de entorno del sistema operativo
console.log(process.env.USER) //* Variable de entorno del usuario
console.log(process.env.PATH) //* Variable de entorno del path
