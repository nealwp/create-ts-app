FROM node:lts-alpine as build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:slim

ENV NODE_ENV production
USER node

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --omit-dev
COPY --from=build /usr/src/app/dist ./dist

CMD [ "npm", "start" ]
