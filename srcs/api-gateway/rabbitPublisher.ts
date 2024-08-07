import client, { Connection, Channel } from "amqplib";

import { getRabbitMQConfig } from "./config";

const { host, username, password, port } = getRabbitMQConfig();

let channel: Channel;

const rabbitMQConnection = async () => {
    try {
        const connection: Connection = await client.connect(
            `amqp://${username}:${password}@${host}:${port}`
        );
        channel = await connection.createChannel();

        await channel.assertQueue('BILLING_QUEUE', { durable: true });

        console.log(`[RabbitMQ]: waiting for messages in INVENTORY_QUEUE`);
    } catch (error) {
        console.error(`[RabbitMQ]: failed to connect to RabbitMQ. ${error}`);
    }
};

export const sendToBillingQueue = async (message: any) => {
    try {
        await rabbitMQConnection();
        channel.sendToQueue('BILLING_QUEUE', Buffer.from(JSON.stringify(message)),
            {
                persistent: true
            });
        console.log(`[RabbitMQ]: sent message to queue`)
    } catch (error) {
        console.error(`[RabbitMQ]: failed to send message to queue. ${error}`);
    }
};
