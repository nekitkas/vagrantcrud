FROM alpine:3.20 AS build

RUN apk add --no-cache nodejs npm
RUN npm install -g typescript

WORKDIR /inventory-app

COPY package.json tsconfig.json ./

RUN npm install

COPY app ./app
COPY server.ts ./

RUN npm run build

FROM alpine:3.20

RUN apk add --no-cache nodejs npm

WORKDIR /inventory-app

COPY --from=build /inventory-app/dist ./dist
COPY --from=build /inventory-app/node_modules ./node_modules
COPY --from=build /inventory-app/package.json ./

EXPOSE $INVENTORY_APP_PORT

CMD npm run start