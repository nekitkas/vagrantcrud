import express, {Express} from 'express';
import { getApiConfig } from "./app/config/config";
import { sequelizeConnection } from "./app/config/connection";
import { rabbitMQConnection } from "./app/config/rabbitmq";
import { Order } from './app/models/order';
const app: Express = express();
const port = getApiConfig().apiPort;
sequelizeConnection.addModels([Order])
app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});

const start = async (): Promise<void> => {
    try{
        await sequelizeConnection.authenticate();
        await sequelizeConnection.sync({
            force: true
        });
        await rabbitMQConnection();
        app.listen(port, () => {
            console.log(`[server]: server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error(`[server]: server failed to start. Error: ${error}`);
        process.exit(1);
    }
}

void start();
