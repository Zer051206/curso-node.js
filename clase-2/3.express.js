const express = require('express')
const ditto = require('./pokemon/ditto.json')

const PORT = process.env.PORT || 3000

const app = express()
app.disable('x-powered-by') // ? Deshabilitar el encabezado x-powered-by

app.use(express.json()) // ? Middleware para parsear JSON en el cuerpo de la request

// ? Puedes poner para que metodo unico se aplica este middleware
// app.use((req, res, next) => { // ! Puedes agregar a que rutas quieres que se aplique este middleware('/pokemon/*')
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

// ! Aquí solo llegan las request que son POST y tienen content-type application/json

//   let body = ''

// ? Escuchar el evento 'data' para recibir datos del cliente
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now() // ? Agregar un timestamp a la respuesta
//     // * Mutar la request y meter la informacion en req.body
//     req.body = data
//     next()
//   })

// { console.log('Mi primer middleware') } // ? Middleware de ejemplo
// * Trakear la request a la base de datos, o hacer algo antes de que llegue a la ruta.
// * Revisar si el usuario tiene cookies o no.
// next() // ? Llamar a next() para pasar al siguiente middleware o ruta
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto) // ? Responder con el JSON de Ditto
})

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body) // ? Responder con el cuerpo de la request que se envió
})

// ? Manejar el error 404 siempre al final (funciona en orden)

app.use((req, res) => { // * use se ejecuta para todas las rutas (get, post, delete, etc.)
  res.status(404).send('Página no encontrada') // * Respuesta para rutas no encontradas
})
