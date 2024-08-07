import { Request, Response } from "express";
import { Movie } from "../models/movies";
import { validationResult } from 'express-validator';
import { MovieBody, MovieParams, MovieQuery, MovieUpdate } from "../models/movie_interface";

const addMovie = async (req: MovieBody, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
        return;
    }

    const { title, description } = req.body;
    const movie = await Movie.create({ title, description });

    if (!movie) {
        res.status(500).json({ message: 'Movie not created' });
        return
    }

    res.json(movie);
}

const getMovies = async (req: MovieQuery, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.mapped() });
    }

    const { title } = req.query;

    try {
        let movies;

        if (title) {
            movies = await Movie.findAll({ where: { title } });
            if (movies.length === 0) {
                return res.status(404).json({ message: 'Movie not found' });
            }
        } else {
            movies = await Movie.findAll();
        }
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

const getMovieById = async (req: MovieParams, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
        return;
    }

    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
        res.status(404).json({ message: 'Movie not found' });
        return
    }

    res.json(movie);
}

const deleteAllMovies = async (req: Request, res: Response) => {
    await Movie.destroy({ where: {} });
    res.json({ message: 'All movies deleted' });
}

const deleteMovieById = async (req: MovieParams, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
        return;
    }

    const { id } = req.params;
    const deleted = await Movie.destroy({ where: { id } });
    if (!deleted) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }

    res.json({ message: 'Movie deleted' });
}

const updateMovie = async (req: MovieUpdate, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() });
        return;
    }

    const { id } = req.params;
    const { title, description } = req.body;
    const updated = await Movie.update({ title, description }, { where: { id } });

    if (!updated) {
        res.status(404).json({ message: 'Movie not found' });
        return;
    }

    res.json({ message: 'Movie updated' });
}

export { addMovie, getMovies, getMovieById, deleteAllMovies, deleteMovieById, updateMovie };