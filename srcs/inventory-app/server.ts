import express, { Express, Request, Response } from 'express';
import { sequelizeConnection } from "./app/config/connection";
import { Movie } from "./app/models/movies";
import morgan from "morgan";
import movieRouter from "./app/routes/movie";
import cors from 'cors';
import {InventoryServiceConfig, serviceConfig} from "./app/config/config";

const app: Express = express();
const config: InventoryServiceConfig = serviceConfig();

sequelizeConnection.addModels([Movie]);

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', movieRouter);
app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('[Inventory-service] Health check passed!');
});

const start = async (): Promise<void> => {
    try {
        await sequelizeConnection.authenticate();
        await sequelizeConnection.sync();
        app.listen(config.port,() => {
            console.log(`[Inventory-service]: server is running at http://${config.host}:${config.port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

void start();
