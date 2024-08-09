
export interface BillingServiceConfig {
    port: string;
    host: string;
}

export interface PostgresConfig {
    database: string;
    username: string;
    password: string;
    host: string;
    port: number;
}

export interface RabbitMQConfig {
    host: string;
    port: number;
    username: string;
    password: string;
}

export const serviceConfig = (): BillingServiceConfig => {
    if (!process.env.BILLING_APP_PORT) {
        throw new Error("BILLING_APP_PORT is not defined");
    }

    return {
        port: process.env.BILLING_APP_PORT,
        host: process.env.BILLING_APP_HOST || "localhost",
    }
}

export const postgresConfig = (): PostgresConfig => {
    if (!process.env.BILLING_DB_NAME) {
        throw new Error("POSTGRES_NAME is not defined");
    }

    if (!process.env.BILLING_DB_USER) {
        throw new Error("POSTGRES_USER is not defined");
    }

    if (!process.env.BILLING_DB_PASSWORD) {
        throw new Error("POSTGRES_PASSWORD is not defined");
    }

    return {
        database: process.env.BILLING_DB_NAME,
        username: process.env.BILLING_DB_USER,
        password: process.env.BILLING_DB_PASSWORD,
        host: process.env.BILLING_DB_HOST || "localhost",
        port: Number(process.env.BILLING_DB_PORT) || 5432
    }
}

export const rabbitmqConfig = (): RabbitMQConfig => {
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
        host: process.env.RABBITMQ_HOST || "localhost",
        port: Number(process.env.RABBITMQ_PORT),
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASSWORD
    }
}
