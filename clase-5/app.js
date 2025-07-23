import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'


// ? Como leer en ESModules
// ? 1. Como deberia hacerse:

import movies from './movies.json' with { type: 'json' }

// ? 2. Con file system:

// * import fs from 'node:fs'
// * const movies = JSONparse(fs.readFileSync('./movies.json', 'utf-8'))

// ? 3. Recomendada antes:

// * import { createRequire } from 'node:module'
// * const require = createRequire(import.meta.url)
// * const movies = require('./movies.json')s

// ? Métodos normales: GET/HEAD/POST
// ? Métodos complejos: PUT/PATCH/DELETE/

// ? CORS = Cross Origin Resource Sharing

// ? CORS PRE-Flight: AL HACER UNA PETICIÓN COMPLEJA REQUIERE UNA PETICIÓN ESPECIAL LLAMADA OPTIONS

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')
  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT || 1234

  app.listen(PORT, () => {
    console.log(`server is listening on port http://localhost:${PORT}`)
  })
}


