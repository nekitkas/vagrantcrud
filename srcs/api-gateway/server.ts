import express, {Express} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import moviesProxyMW from "./proxy";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(moviesProxyMW);
app.use(express.urlencoded({ extended: true }));

const start = async () => {
    app.listen(port, () => {
        console.log(`[server]: gateway is running at http://localhost:${port}`);
    });
};

void start();