FROM node:24-alpine AS builder
WORKDIR /JobPortal/Backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /JobPortal/Backend
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /JobPortal/Backend/dist ./dist
COPY .sequelizerc .sequelizerc
COPY src/db/migrations ./dist/db/migrations
COPY src/db/seeders ./dist/db/seeders
CMD ["node", "dist/server.js"]