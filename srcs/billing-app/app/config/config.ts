import dotenv from "dotenv";

dotenv.config();

interface ApiConfig {
    apiPort: string;
}

interface PostgresConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
}

interface RabbitMQConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export const getApiConfig = (): ApiConfig => {
    if (!process.env.BILLING_APP_PORT) {
        throw new Error("BILLING_APP_PORT is not defined");
    }

    return {
        apiPort: process.env.BILLING_APP_PORT,
    }
}

export const getPostgresConfig = (): PostgresConfig => {
    if (!process.env.POSTGRES_NAME) {
        throw new Error("POSTGRES_NAME is not defined");
    }

    if (!process.env.POSTGRES_USER) {
        throw new Error("POSTGRES_USER is not defined");
    }

    if (!process.env.POSTGRES_PASSWORD) {
        throw new Error("POSTGRES_PASSWORD is not defined");
    }

    if (!process.env.POSTGRES_HOST) {
        throw new Error("POSTGRES_HOST is not defined");
    }

    if (!process.env.POSTGRES_PORT) {
        throw new Error("POSTGRES_PORT is not defined");
    }

    return {
        database: process.env.POSTGRES_NAME,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT)
    }
}

export const getRabbitMQConfig = (): RabbitMQConfig => {
    if (!process.env.RABBITMQ_HOST) {
        throw new Error("RABBITMQ_HOST is not defined");
    }

    if (!process.env.RABBITMQ_PORT) {
        throw new Error("RABBITMQ_PORT is not defined");
    }

    if (!process.env.RABBITMQ_USER) {
        throw new Error("RABBITMQ_USER is not defined");
    }

    if (!process.env.RABBITMQ_PASSWORD) {
        throw new Error("RABBITMQ_PASSWORD is not defined");
    }

    return {
        host: process.env.RABBITMQ_HOST,
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD
    }
}
