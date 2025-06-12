FROM node:22-slim

ENV TZ Asia/Tokyo
WORKDIR /front_app
RUN apt-get update && apt-get install -y --no-install-recommends vim \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY ./docker/nuxt/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

CMD ["yarn", "dev"]
