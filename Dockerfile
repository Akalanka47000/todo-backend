FROM node:16-alpine

ENV PORT 3000

ENV SQLITE_PATH file:./db.sqlite3

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["npm", "start"]

