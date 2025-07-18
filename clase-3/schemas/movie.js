const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Terror', 'Sci-Fi', 'Romance', 'crime'])
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie
}

module.exports = {
  validatePartialMovie
}
