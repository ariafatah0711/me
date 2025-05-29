FROM node:20

WORKDIR /app

# Install Yarn v4 (atau v3)
RUN corepack enable && corepack prepare yarn@stable --activate

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "develop"]