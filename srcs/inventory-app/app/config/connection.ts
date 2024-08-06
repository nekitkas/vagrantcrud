import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config()

export const sequelizeConnection = new Sequelize({
    logging: false,
    database: process.env.POSTGRES_NAME,
    dialect: 'postgres',
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT)
});