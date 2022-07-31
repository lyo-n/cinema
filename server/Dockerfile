FROM node:16

EXPOSE 8050

WORKDIR /home/node/server

COPY package*.json ./

RUN npm install

COPY . .


# CMD node index index.js

CMD ["npm", "run", "dev"]