FROM node:latest
WORKDIR /
COPY ./build .
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "8080"]