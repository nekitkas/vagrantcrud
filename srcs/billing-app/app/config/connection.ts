import {Sequelize} from 'sequelize-typescript';
import { getPostgresConfig } from "./config";

const dbConfig = getPostgresConfig();

export const sequelizeConnection = new Sequelize({
    logging: false,
    dialect: 'postgres',
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    host: dbConfig.host,
    port: dbConfig.port,
})
