import { body, query } from "express-validator";

export const movieValidator = [
    body('title').isString().notEmpty(),
    body('description').isString().notEmpty()
]

export const movieTitleQueryValidator = [
    query('title').isString().notEmpty()
]