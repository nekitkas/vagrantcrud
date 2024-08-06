import { Router } from 'express';
import {
    addMovie,
    deleteAllMovies,
    deleteMovieById,
    getMovieById,
    getMovies,
    updateMovie
} from "../controllers/movie";
import { movieTitleQueryValidator, movieValidator } from "../models/movie_validator";

const router = Router();

router.get('/movies', movieTitleQueryValidator, getMovies);
router.get('/movies/:id', getMovieById);
router.post('/movies', movieValidator, addMovie);
router.delete('/movies', deleteAllMovies);
router.delete('/movies/:id', deleteMovieById);
router.put('/movies/:id', movieValidator, updateMovie);

export default router;