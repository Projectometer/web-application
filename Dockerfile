# Build stage
FROM node:18-slim AS buildenv

RUN npm install -g @quasar/cli  --loglevel verbose

WORKDIR /app

# copy src
COPY package*.json .
RUN npm i --loglevel verbose

COPY . .
RUN quasar build --history

# Runtime stage

FROM nginx:latest
COPY --from=buildenv /app/dist/spa /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

