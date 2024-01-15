FROM node:18-alpine3.16

RUN npm i -g ts-node
RUN npm i -g nodemon

WORKDIR /app

ENV PORT 5000

EXPOSE $PORT

COPY package*.json /app/

RUN npm i

COPY . /app

CMD ["npm", "start"]
