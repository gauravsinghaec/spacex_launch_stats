FROM node:8.14

LABEL maintainer="Gaurav Singh"

ENV NODE_ENV=production
ENV PORT=3000

COPY . /var/www
WORKDIR /var/www

VOLUME ["/var/www"]

RUN npm i

EXPOSE $PORT
