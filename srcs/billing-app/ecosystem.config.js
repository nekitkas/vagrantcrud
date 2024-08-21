module.exports = {
  apps: [
    {
      name: 'billing-app',
      script: './dist/server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      log_file: '/logs/billing-app.log',
      out_file: '/logs/billing-app-out.log',
      error_file: '/logs/billing-app-error.log',
    },
  ],
};
