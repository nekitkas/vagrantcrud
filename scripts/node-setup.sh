#!/bin/bash

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get update && apt-get install -y nodejs
sudo npm install -g typescript