import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { sequelizeConnection } from "./app/config/connection";
import { Movie } from "./app/models/movies";
import morgan from "morgan";
import movieRouter from "./app/routes/movie";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.INVENTORY_APP_PORT;

sequelizeConnection.addModels([Movie]);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', movieRouter);
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Server is running');
});

const start = async (): Promise<void> => {
    try {
        await sequelizeConnection.authenticate();
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
