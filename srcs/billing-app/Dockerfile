FROM node:20.15.0-slim

WORKDIR /home/nodeuser/app
COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY . .
RUN npm install
EXPOSE 3000
CMD npm run dev