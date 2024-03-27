FROM node:latest
WORKDIR /app
COPY ./build .
RUN npm install -g http-server
CMD ["http-server", "-p", "8080"]