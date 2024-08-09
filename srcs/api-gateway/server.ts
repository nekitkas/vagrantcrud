import express, {Express} from 'express';
import morgan from 'morgan';
import router from './routes'
import { gatewayConfig } from './config';
const app: Express = express();
const { port, host } = gatewayConfig();

console.log(gatewayConfig());

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

const start = async () => {
    app.listen(Number(port),() => {
        console.log(`[GATEWAY]: gateway is running at http://${host}:${port}`);
    });
};

void start();
