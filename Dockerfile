FROM node:latest
WORKDIR /font
COPY ./build .
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]