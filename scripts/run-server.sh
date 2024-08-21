#!/bin/bash

# change directory
echo "Switch directory: " $APP_PATH
cd $APP_PATH

npm install
npm run build
npm run start
