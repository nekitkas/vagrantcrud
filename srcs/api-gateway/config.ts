import dotenv from "dotenv";

dotenv.config()

interface RabbitMQConfig {
    host: string;
    port: number;
    username: string;
    password: string;
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