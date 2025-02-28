# 1. Dùng Node.js 18 làm base image
FROM node:18

# 2. Set thư mục làm việc trong container
WORKDIR /app

# 3. Copy package.json vào container & cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm install

# 4. Copy toàn bộ mã nguồn
COPY . .

# 5. Mở port cho container
EXPOSE 3001

# 6. Chạy server ở chế độ development
CMD ["npm", "run", "dev"]
