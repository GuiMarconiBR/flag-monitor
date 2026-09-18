FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY src ./src
COPY public ./public
USER node
EXPOSE 3000 4000
CMD ["node", "src/backend/server.js"]
