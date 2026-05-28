FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ARG BUILD_CONFIG=staging
RUN npx ng build --configuration=${BUILD_CONFIG}

FROM nginx:alpine
COPY --from=build /app/dist/totolocator/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
