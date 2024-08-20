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
    return {
        host: process.env.RABBITMQ_HOST || 'localhost',
        port: Number(process.env.RABBITMQ_PORT) || 5672,
        username: process.env.RABBITMQ_USER || 'guest',
        password: process.env.RABBITMQ_PASSWORD || 'guest',
    }
}

export const gatewayConfig = (): GatewayConfig => {

    return {
        port: Number(process.env.API_GATEWAY_PORT) || 3000,
        host: process.env.API_GATEWAY_HOST || 'localhost',
    }
}