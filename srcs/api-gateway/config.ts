export interface RabbitMQConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export interface GatewayConfig {
    port: number;
    host: string;
}

export const rabbitMQConfig = (): RabbitMQConfig => {
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
        host: process.env.RABBITMQ_HOST || 'localhost',
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD
    }
}

export const gatewayConfig = (): GatewayConfig => {
    if (!process.env.API_GATEWAY_PORT) {
        throw new Error("GATEWAY_PORT is not defined");
    }

    return {
        port: Number(process.env.API_GATEWAY_PORT),
        host: process.env.API_GATEWAY_HOST || 'localhost',
    }
}