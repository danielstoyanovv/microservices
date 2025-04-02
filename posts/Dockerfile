FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install
RUN tsc

COPY ./ ./

CMD ["npm", "start"]