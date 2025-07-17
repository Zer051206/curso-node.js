const http = require('node:http')

const processRequest = (req, res) => {
  const { method, url } = req

  const dittoJSON = require('./pokemon/ditto.json')

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.statusCode = 404 // ? No encontrado
          return res.end('Página no encontrada')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''

          // ? Escuchar el evento 'data' para recibir datos del cliente
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now() // ? Agregar un timestamp a la respuesta
            res.end(JSON.stringify(data))
          })

          break
        }

        default:
          res.setHeader('Content-Type', 'text/plain; charset=utf-8')
          res.statusCode = 404 // ? No encontrado
          return res.end('Página no encontrada')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('server is listening on port http://localhost:3000')
})
