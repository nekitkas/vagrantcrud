import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello World');
});

const start = async () => {
    app.listen(3001, () => {
        console.log('Server is running');
    });
};

void start();