FROM alpine:3.20 AS build

RUN apk add --no-cache nodejs npm
RUN npm install -g typescript

WORKDIR /billing-app

COPY package.json tsconfig.json ./

RUN npm install

COPY app ./app
COPY server.ts ./

RUN npm run build

FROM alpine:3.20

RUN apk add --no-cache nodejs npm

WORKDIR /billing-app

COPY --from=build /billing-app/dist ./dist
COPY --from=build /billing-app/node_modules ./node_modules
COPY --from=build /billing-app/package.json ./

EXPOSE $BILLING_APP_PORT

CMD npm run start