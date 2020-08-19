FROM node:12
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install && yarn cache clean
COPY . .

HEALTHCHECK CMD ["yarn", "healthcheck"]
CMD ["yarn", "start"]
