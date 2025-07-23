import { Router } from "express"; 
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()

    const movieModelInstance = new movieModel();

    const movieController = new MovieController({ movieModel: movieModelInstance })

    moviesRouter.get('/', movieController.getAll)
    moviesRouter.post('/', movieController.create)
    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.delete('/:id', movieController.delete)
    moviesRouter.patch('/:id', movieController.update)

    return moviesRouter
}