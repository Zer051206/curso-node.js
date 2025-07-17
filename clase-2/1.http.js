const http = require('node:http') // ? Prótocolo http
const fs = require('node:fs')

const desirePort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  if (req.url === '/') {
    res.statusCode = 200 // ? OK
    res.end('Bienvenido a mi página de inicio.') // ? Respuesta al cliente
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // ? OK
    res.end('Página de contacto.') // ? Respuesta al cliente
  } else if (req.url === '/imagen-gatico-lindo.png') {
    fs.readFile('clase-2/Gatico.png', (err, data) => {
      if (err) {
        console.log('Error al leer la imagen:', err) // ? Error al leer la imagen
        res.statusCode = 500 // ? Error interno del servidor
        res.end('Error al cargar la imagen.') // ? Respuesta al cliente
      } else {
        res.setHeader('Content-Type', 'image/png') // ? Tipo de contenido de la imagen
        res.end(data) // ? Respuesta al cliente con la imagen
      }
    })
  } else {
    res.statusCode = 404 // ? No encontrado
    res.end('Página no encontrada.') // ? Respuesta al cliente
  }
}

const server = http.createServer(processRequest)

server.listen(desirePort, () => {
  console.log(`server is listening on port http://localhost:${desirePort}`)
})
