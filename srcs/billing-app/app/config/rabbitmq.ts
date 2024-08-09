import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import { rabbitmqConfig } from "./config";
import { Order} from '../models/order'

const { host, username, password, port } = rabbitmqConfig();

export const rabbitMQConnection = async () => {
    try {
        const connection: Connection = await client.connect(
            `amqp://${username}:${password}@${host}:${port}`
        );
        const channel: Channel = await connection.createChannel();

        await channel.assertQueue('BILLING_QUEUE', { durable: true });

        await channel.consume('BILLING_QUEUE', async (message: ConsumeMessage | null) => {
            if (message) {
                console.log(`[RabbitMQ]: received message: ${message.content.toString()}`);
                const data = JSON.parse(message.content.toString());

                await Order.create(data);
                console.log(`[RabbitMQ]: order created successfully`)
                channel.ack(message);
                console.log(`[RabbitMQ]: message processed successfully`)
            }
        });
        console.log(`[RabbitMQ]: waiting for messages in BILLING_QUEUE`);
    } catch (error) {
        console.error(`[RabbitMQ]: failed to connect to RabbitMQ. ${error}`);
    }
};
