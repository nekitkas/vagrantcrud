import express, {Express} from 'express';
import { serviceConfig } from "./app/config/config";
import { sequelizeConnection } from "./app/config/connection";
import { rabbitMQConnection } from "./app/config/rabbitmq";
import { Order } from './app/models/order';
import router from './app/routes/orders';

const app: Express = express();
const { port, host } = serviceConfig();

sequelizeConnection.addModels([Order])

app.use(router);

const start = async (): Promise<void> => {
    try{
        await sequelizeConnection.authenticate();
        await sequelizeConnection.sync({
            force: true
        });
        await rabbitMQConnection();
        app.listen(Number(port), () => {
            console.log(`[Billing-service]: server is running at http://${host}:${port}`);
        });
    } catch (error) {
        console.error(`[Billing-service]: server failed to start. Error: ${error}`);
        process.exit(1);
    }
}

void start();
