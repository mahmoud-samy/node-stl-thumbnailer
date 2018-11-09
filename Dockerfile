FROM node:8

RUN apt-get update \
    && apt-get install -qq libcairo2-dev libjpeg-dev libpango1.0-dev libgif-dev build-essential g++

# RUN mkdir -p /opt/node/js \
#     && cd /opt/node \
#     && npm i canvas

# WORKDIR /opt/node/js

# ENTRYPOINT ["node"]

WORKDIR /server
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ]