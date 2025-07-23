import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = { 
  host: 'localhost',
  user: 'root', 
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connect = createClient(DEFAULT_CONFIG)

export class MovieModel {
  async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase();

      const [genres] = await connect.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      );

      if (genres.length === 0) return [];

      const [{ id }] = genres;

      const [movies] = await connect.query(
        'SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, ' +
        "GROUP_CONCAT(g.name SEPARATOR ',') as generos " +
        'FROM movie m ' +
        'JOIN movie_genres me ON me.movie_id = m.id ' +
        'JOIN genre g ON g.id = me.genre_id ' +
        'WHERE EXISTS (SELECT 1 FROM movie_genres mg2 WHERE mg2.movie_id = m.id AND mg2.genre_id = ?)' +
        'GROUP BY m.id;', [id] 
      );

      return movies;
    } else {
      const [movies] = await connect.query(
        'SELECT m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate, ' +
        "GROUP_CONCAT(g.name SEPARATOR ',') as generos " + 
        'FROM movie m ' +
        'JOIN movie_genres me ON me.movie_id = m.id ' +
        'JOIN genre g ON g.id = me.genre_id ' +
        'GROUP BY m.id;'
      );
      return movies;
    }
}

  async getById ({ id }) {
    const [movies] = await connect.query(
      `SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id=?;`, [id]
    )

    if(movies.length === 0) return null

    return movies[0]
  }

  async create ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate,
      genre
    } = input;

    const [uuidResult] = await connect.query('SELECT UUID() uuid;');
    const [{ uuid: movieId }] = uuidResult;

    try {
      await connect.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [movieId, title, year, director, duration, poster, rate]
      );

      const genreIdsToLink = []; 
      // ? Verifica que 'genres' sea un array y no esté vacío
      if (genre && Array.isArray(genre) && genre.length > 0) {
        for (const genreName of genre) {
          const [existingGenreRows] = await connect.query(
            'SELECT id FROM genre WHERE LOWER(name) = LOWER(?);',
            [genreName]
          );

          let genreId;
          if (existingGenreRows.length > 0) {
            genreId = existingGenreRows[0].id;
            genreIdsToLink.push(genreId);
          } else {
            throw new Error(`El género "${genreName}" no está registrado.`);
          }
        }
      }

      // ? Insertar las relaciones en movie_genres (la tabla pivot)
      if (genreIdsToLink.length > 0) {
        const valuesPlaceholder = genreIdsToLink.map(() => '(?, ?)').join(', ');
        const flatValues = [];

        for (const gId of genreIdsToLink) {
          flatValues.push(movieId, gId);
        }

        await connect.query(
          `INSERT INTO movie_genres (movie_id, genre_id) VALUES ${valuesPlaceholder};`,
          flatValues
        );
      }

    } catch (e) {
      throw new Error('Error al crear la película: ' + e.message); 
    }

    // ? Recuperar y devolver la película creada con todos sus géneros concatenados
  
    const [movies] = await connect.query(
      `SELECT
          m.id, m.title, m.year, m.director, m.duration, m.poster, m.rate,
          GROUP_CONCAT(g.name SEPARATOR ',') as generos
      FROM
          movie m
      LEFT JOIN
          movie_genres mg ON mg.movie_id = m.id
      LEFT JOIN
          genre g ON g.id = mg.genre_id
      WHERE
          m.id = ?
      GROUP BY m.id;`,
      [movieId] 
    );

    return movies.length > 0 ? movies[0] : null;
  }

  
  async delete ({ id }) {
    try{
      await connect.query(
        `DELETE  FROM movie WHERE id = ?;`, [id]
      )
    } catch (e) {
      throw new Error ('No se pudo eliminar la pelicula: ' + e.message)
    }
  }

  async update ({ id, input }) {
    const sets = []
    const values = []

    for ( const key in input ){
        sets.push(`${key} = ?`)
        values.push(input[key])
    }

    if ( sets.length === 0 ) {
      return false
    }

    values.push(id);

    try {
      const [result] = await connect.query(
        `UPDATE movie SET ${sets.join (', ')} WHERE id = ?`, values 
      )
       
      if ( result.affecctedRows === 0 ) {
        return false;
      }

      const [updatedMovieResult] = await connect.query(
            'SELECT id, title, year, director, duration, poster, rate FROM movie WHERE id = ?',
            [id]
          )  

          return updatedMovieResult[0]

    } catch (e) {
      throw new Error ('No se pudo actualizar la pelicula: ' + e.message)
    }

  }
}
