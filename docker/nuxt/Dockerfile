FROM node:18-slim

ENV TZ Asia/Tokyo
WORKDIR /front_app
RUN apt-get update && apt-get install -y --no-install-recommends git vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ../../front_app/package.json ../../front_app/yarn.lock ./
RUN yarn install

CMD ["yarn", "dev"]
