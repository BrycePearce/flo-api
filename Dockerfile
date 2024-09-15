FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 3000

CMD ["npx", "ts-node", "src/app.ts"]
