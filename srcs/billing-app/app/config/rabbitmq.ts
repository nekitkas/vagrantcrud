import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import { getRabbitMQConfig } from "./config";
import { Order} from '../models/order'

const { host, username, password, port } = getRabbitMQConfig();

console.log('rabbitmq config', getRabbitMQConfig())

export const rabbitMQConnection = async () => {
    try {
        const connection = await client.connect(
            `amqp://${username}:${password}@${host}:${port}`
        );
        const channel = await connection.createChannel();

        await channel.assertQueue('BILLING_QUEUE', { durable: true });

        await channel.consume('BILLING_QUEUE', async (message) => {
            if (message) {
                console.log(`[RabbitMQ]: received message: ${message.content.toString()}`);
                const data = JSON.parse(message.content.toString());

                await Order.create(data);
            }
        });
        console.log(`[RabbitMQ]: waiting for messages in BILLING_QUEUE`);
    } catch (error) {
        console.error(`[RabbitMQ]: failed to connect to RabbitMQ. ${error}`);
    }
}

/*class RabbitMQConnection {
    private connection!: Connection;
    private channel!: Channel;
    private connected!: boolean;

    async connect() {
        if (this.connected && this.channel) return;
        else this.connected = true;

        try {
            this.connection = await client.connect(
                `amqp://${username}:${password}@${host}:${port}`
            );
            this.channel = await this.connection.createChannel();
            console.log(`[RabbitMQ]: connected to RabbitMQ`);
        } catch (error) {
            console.error(`[RabbitMQ]: failed to connect to RabbitMQ. Error: ${error}`);
        }
    }

    async sendToQueue(queue: string, message: any) {
        try {
            if (!this.channel) {
                await this.connect();
            }
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        } catch (error) {
            console.error(`[RabbitMQ]: failed to send message to queue. Error: ${error}`);
            throw error;
        }
    }

    async consume(queue: string, callback: (message: ConsumeMessage | null) => void) {

    }}

export const rabbitMQConnection = new RabbitMQConnection();*/



