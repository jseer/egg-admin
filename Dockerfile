FROM node:16-alpine

WORKDIR /app
COPY . /app

RUN npm install --production --registry https://registry.npm.taobao.org

EXPOSE 7001
CMD [ "npm", "start" ]