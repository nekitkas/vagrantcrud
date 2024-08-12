#!/bin/bash

# Get a list of all running container IDs
running_containers=$(docker ps -q)

# Check if there are any running containers
if [ -n "$running_containers" ]; then
    # Stop all running containers
    docker stop $running_containers
    echo "All running Docker containers have been stopped."
else
    echo "No running Docker containers to stop."
fi
