import express, {Express} from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes'
import { gatewayConfig } from './config';

const app: Express = express();
const { port, host } = gatewayConfig();

console.log(gatewayConfig());

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(router)

const start = async () => {
    app.listen(Number(port), host,() => {
        console.log(`[GATEWAY]: gateway is running at http://${host}:${port}`);
    });
};

void start();