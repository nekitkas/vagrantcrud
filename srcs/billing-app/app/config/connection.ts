import {Sequelize} from 'sequelize-typescript';
import { postgresConfig } from "./config";

const config = postgresConfig();

console.log(config)

export const sequelizeConnection = new Sequelize({
    logging: false,
    dialect: 'postgres',
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port,
})
