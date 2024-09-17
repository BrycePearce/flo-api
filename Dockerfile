FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate --schema=src/prisma/schema.prisma

EXPOSE 3000

CMD npx prisma migrate deploy --schema=src/prisma/schema.prisma && npx ts-node src/app.ts
