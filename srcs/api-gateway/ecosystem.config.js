module.exports = {
  apps: [
    {
      name: 'api-gateway',
      script: './dist/server.js', // The entry point of your API Gateway
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/logs/api-gateway.log',
      out_file: '/logs/api-gateway-out.log',
      error_file: '/logs/api-gateway-error.log',
      env: {
        NODE_ENV: 'production',
        API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,
        INVENTORY_APP_PORT: process.env.INVENTORY_APP_PORT,
        INVENTORY_APP_HOST: process.env.INVENTORY_APP_HOST,
        BILLING_APP_PORT: process.env.BILLING_APP_PORT,
        BILLING_APP_HOST: process.env.BILLING_APP_HOST,
        RABBITMQ_PORT: process.env.RABBITMQ_PORT,
        RABBITMQ_HOST: process.env.RABBITMQ_HOST,
        RABBITMQ_USER: process.env.RABBITMQ_USER,
        RABBITMQ_PASSWORD: process.env.RABBITMQ_PASSWORD,
      },
    },
  ],
};
