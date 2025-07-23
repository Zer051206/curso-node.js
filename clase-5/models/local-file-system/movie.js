import { randomUUID } from 'node:crypto'
import movies from '../../movies.json' with { type: 'json' }
export class MovieModel {
    async getAll ({genre}) {
        if(genre){
            return movies.filter(
                movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    async getByID ({ id }) {
        const movie = movies.find(movie => movie.id === id)
        return movie
    }

    async create ({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
          }

          movies.push(newMovie)

          return newMovie
    }

    async delete ({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)
        if (movieIndex === -1) return false

         movies.splice(movieIndex, 1)
         return true
    }

    async update ({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id === id)

        if (movieIndex === -1) return false

        movies[movieIndex] = { 
            ...movies[movieIndex],
            ...input
        }

        return movies[movieIndex]
    }
}


