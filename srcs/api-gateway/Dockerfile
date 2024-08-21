FROM alpine:3.20 AS build

RUN apk add --no-cache nodejs npm
RUN npm install -g typescript

WORKDIR /gateway-app

COPY package.json tsconfig.json ./

RUN npm install

COPY config.ts proxy.ts rabbitPublisher.ts routes.ts server.ts swagger.ts swagger_output.json ecosystem.config.js ./

RUN npm run build

FROM alpine:3.20

RUN apk add --no-cache nodejs npm
RUN npm install pm2 -g

WORKDIR /gateway-app

COPY --from=build /gateway-app/ecosystem.config.js ./
COPY --from=build /gateway-app/dist ./dist
COPY --from=build /gateway-app/node_modules ./node_modules
COPY --from=build /gateway-app/package.json ./
COPY --from=build /gateway-app/swagger_output.json ./

EXPOSE $GATEWAY_APP_PORT

CMD ["pm2-runtime", "ecosystem.config.js"]