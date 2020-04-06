FROM node:10.18-alpine

# Create app directory
RUN mkdir -p /app

WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY yarn.lock ./

#RUN npm install pm2 -g
RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

RUN mv .env.example .env

EXPOSE 8082

CMD [ "yarn","start"]