#!/bin/bash

rabbitmq-server -detached

until rabbitmqctl status; do
  echo "Waiting for RabbitMQ to start..."
  sleep 5
done

if rabbitmqctl list_users | grep -q ${RABBITMQ_USER}; then
  echo "User ${RABBITMQ_USER} already exists."
else
  rabbitmqctl add_user ${RABBITMQ_USER} ${RABBITMQ_PASSWORD}
  rabbitmqctl set_user_tags ${RABBITMQ_USER} administrator
  rabbitmqctl set_permissions -p / ${RABBITMQ_USER} ".*" ".*" ".*"
  echo "User ${RABBITMQ_USER} created and permissions set."
fi

rabbitmqctl stop

exec rabbitmq-server
