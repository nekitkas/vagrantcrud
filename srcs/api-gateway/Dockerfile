FROM alpine:3.20 AS build

RUN apk add --no-cache nodejs npm
RUN npm install -g typescript

WORKDIR /gateway-app

COPY package.json tsconfig.json ./

RUN npm install

COPY config.ts proxy.ts rabbitPublisher.ts routes.ts server.ts ./

RUN npm run build

FROM alpine:3.20

RUN apk add --no-cache nodejs npm

WORKDIR /gateway-app

COPY --from=build /gateway-app/dist ./dist
COPY --from=build /gateway-app/node_modules ./node_modules
COPY --from=build /gateway-app/package.json ./

EXPOSE $GATEWAY_APP_PORT

CMD npm run start