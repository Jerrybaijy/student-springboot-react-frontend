# 使用官方 nginx 镜像作为基础镜像
FROM nginx:latest

# 将本地静态资源文件夹复制到 nginx 默认的静态文件目录下
COPY ./build /usr/share/nginx/html

# 暴露容器内的 8080 端口
EXPOSE 8080

# 使用 nginx 镜像默认的启动命令
CMD ["nginx", "-g", "daemon off;"]