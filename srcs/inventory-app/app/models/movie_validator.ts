import {body, check } from "express-validator";

export const movieValidator = [
    body('title').isString().notEmpty(),
    body('description').isString().notEmpty()
]

export const movieTitleQueryValidator = [
    check('title').optional().isString()
]