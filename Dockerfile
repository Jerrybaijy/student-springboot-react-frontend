# 使用官方 Node.js 作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果存在）到工作目录
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制源代码到工作目录
COPY . .

# 构建生产环境应用程序
RUN npm run build

# 在容器中运行的命令
CMD ["npm", "start"]
