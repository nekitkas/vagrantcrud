import express, {Express, Request, Response} from 'express';
import morgan from 'morgan';
import router from './routes'
import { gatewayConfig } from './config';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from './swagger_output.json';

const app: Express = express();
const { port, host } = gatewayConfig();

console.log(gatewayConfig());

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).send('[GATEWAY] Gateway is up and running!');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

const start = async () => {
    app.listen(Number(port),() => {
        console.log(`[GATEWAY]: gateway is running at http://${host}:${port}`);
    });
};

void start();
