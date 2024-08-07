import express, {Express} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes'

dotenv.config();

const app: Express = express();
const port = process.env.API_GATEWAY_PORT

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(router)

const start = async () => {
    app.listen(port, () => {
        console.log(`[GATEWAY]: gateway is running at http://localhost:${port}`);
    });
};

void start();