import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { sequelizeConnection } from "./config/connection";
import {
    addMovie,
    deleteAllMovies,
    deleteMovieById,
    getMovieById,
    getMovies,
    updateMovie
} from "./controllers/movie";
import { Movie } from "./models/movies";
import morgan from "morgan";
import { movieTitleQueryValidator, movieValidator} from "./models/movie_validator";


dotenv.config();

const app: Express = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));


sequelizeConnection.addModels([Movie]);
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

app.get('/movies', movieTitleQueryValidator, getMovies);
app.get('/movies/:id', getMovieById);
app.post('/movies', movieValidator, addMovie);
app.delete('/movies', deleteAllMovies);
app.delete('/movies/:id', deleteMovieById);
app.put('/movies/:id', movieValidator, updateMovie);

const start = async (): Promise<void> => {
    try {
        await sequelizeConnection.sync();
        app.listen(port, () => {
            console.log(`[server]: server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();
