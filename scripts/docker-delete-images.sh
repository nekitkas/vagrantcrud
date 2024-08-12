#!/bin/bash

# Get a list of all running container IDs
images=$(docker image ls -q)

# Check if there are any running containers
if [ -n "$images" ]; then
    # Stop all running containers
    docker image rm $images
    echo "All running Docker containers have been stopped."
else
    echo "No running Docker containers to stop."
fi
