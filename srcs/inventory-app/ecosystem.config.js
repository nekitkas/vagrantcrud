module.exports = {
  apps: [
    {
      name: 'inventory-app',
      script: './dist/server.js', // The entry point of your API Gateway
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/logs/inventory-app.log',
      out_file: '/logs/inventory-app-out.log',
      error_file: '/logs/inventory-app-error.log',
    },
  ],
};
