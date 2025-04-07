FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install
COPY ./ ./
COPY ./build ./build

CMD ["npm", "start"]