FROM node:16.15.0-alpine As builder

WORKDIR /usr/src/app

COPY ./Jeopardy/package.json ./Jeopardy/package-lock.json ./

RUN npm install

COPY . .

RUN cwd

RUN npm run build --prod

FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/jeopardy /usr/share/nginx/html
