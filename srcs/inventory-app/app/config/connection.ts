import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config()

export const sequelizeConnection = new Sequelize({
    logging: true,
    database: process.env.INVENTORY_DB_NAME,
    dialect: 'postgres',
    username: process.env.INVENTORY_DB_USER,
    password: process.env.INVENTORY_DB_PASSWORD,
    host: process.env.INVENTORY_DB_HOST,
    port: Number(process.env.INVENTORY_DB_PORT)
});