import express, {Express} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3002;

app.get('/health', (req, res) => {
    res.status(200).send('Server is running');
});

const start = async (): Promise<void> => {
    app.listen(port, () => {
        console.log(`[server]: server is running at http://localhost:${port}`);
    });
}

void start();