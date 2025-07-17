const http = require('node:http') // ? Prótocolo http

const { findAvaliblePort } = require('./10.free-port.js') // ? Importa la función para encontrar un puerto disponible

const desirePort = process.env.PORT ?? 3000
const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hello, World!')
})

findAvaliblePort(desirePort).then(port => {
  server.listen(port, () => {
    console.log(`server is listening on port https://localhost:${port}`)
  })
})
