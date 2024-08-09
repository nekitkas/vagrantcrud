import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from "./config";

const config = dbConfig();
console.log(config);
export const sequelizeConnection = new Sequelize({
    logging: true,
    database: config.database,
    dialect: 'postgres',
    username: config.username,
    password: config.password,
    host: config.db_host,
    port: config.db_port,
});