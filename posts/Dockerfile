FROM node:alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
COPY build /app/build

CMD ["npm", "start"]