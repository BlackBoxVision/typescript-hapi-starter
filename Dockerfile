FROM node:8.1.2-alpine

MAINTAINER BlackBoxVision

WORKDIR PROJECT_DIR

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN npm install -g yarn
RUN yarn install

COPY /src .
COPY /logs .
COPY /data .

COPY tsconfig.json .

EXPOSE PORT