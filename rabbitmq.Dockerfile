# Use Alpine Linux as the base image
FROM alpine:3.20

# Install RabbitMQ server and its dependencies
RUN apk add --no-cache rabbitmq-server \
    bash

# Expose RabbitMQ default ports
EXPOSE 5672 15672

# Copy the entrypoint script
COPY scripts/rabbit-entrypoint.sh /usr/local/bin/

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/rabbit-entrypoint.sh

# Use the custom entrypoint script
ENTRYPOINT ["rabbit-entrypoint.sh"]

# Start RabbitMQ server
CMD ["rabbitmq-server"]
