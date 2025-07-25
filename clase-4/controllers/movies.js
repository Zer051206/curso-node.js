import { movieModel } from '../models/local-file-system/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js' 

export class movieController {
    static async getAll (req, res) {
        const { genre } = req.query
        const movies = await movieModel.getAll({ genre })
        // ? Què es lo que renderiza
        res.json(movies)
    }

    static async getById (req, res) {
      const { id } = req.params
      const movie = await movieModel.getByID({ id })
      if (movie) return res.json(movie)
      res.status(404).json({ error: 'Movie not found' })
    }

    static async create (req, res) {
      const result = validateMovie(req.body)
      
      if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
    
      const newMovie = await movieModel.create({ input: result.data })
    
      res.status(201).json(newMovie) // ? Actualizar la cachè del cliente
    }

    static async delete (req, res) {
      const { id } = req.params
    
      const result = await movieModel.delete({ id })
    
      if (result === false) {
        return res.status(404).json({ error: 'Movie not found' })
      }
    
      return res.json({ message: 'Movie deleted successfully' })
    }

    static async update (req, res) {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params
        
        const updatedMovie = await movieModel.update({ id, input: result.data})

        return res.json(updatedMovie)
    }
}
