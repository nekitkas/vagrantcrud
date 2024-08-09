export interface DBConfig {
    database: string;
    username: string;
    password: string;
    db_host: string;
    db_port: number;
}

export interface InventoryServiceConfig {
    host: string;
    port: number;
}

export const dbConfig = (): DBConfig => {
    if (!process.env.INVENTORY_DB_NAME) {
        throw new Error("INVENTORY_DB_NAME is not defined");
    }
    if (!process.env.INVENTORY_DB_USER) {
        throw new Error("INVENTORY_DB_USER is not defined");
    }
    if (!process.env.INVENTORY_DB_PASSWORD) {
        throw new Error("INVENTORY_DB_PASSWORD is not defined");
    }

    return {
        database: process.env.INVENTORY_DB_NAME,
        username: process.env.INVENTORY_DB_USER,
        password: process.env.INVENTORY_DB_PASSWORD,
        db_host: process.env.INVENTORY_DB_HOST || 'localhost',
        db_port: Number(process.env.INVENTORY_DB_PORT) || 5432
    }
}

export const serviceConfig = (): InventoryServiceConfig => {
    return {
        host: process.env.INVENTORY_APP_HOST || 'localhost',
        port: Number(process.env.INVENTORY_APP_PORT) || 3000
    }
}