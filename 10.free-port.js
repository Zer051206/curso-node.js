const net = require('node:net') // ? Módulo net para manipulacion de sockets

function findAvaliblePort (desireport) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desireport, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvaliblePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvaliblePort } // ? Exporta la función para encontrar un puerto disponible
