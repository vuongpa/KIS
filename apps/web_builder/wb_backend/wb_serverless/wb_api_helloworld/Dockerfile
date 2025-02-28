# Stage 1: Build
FROM node:23-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for both backend and shared-utils
COPY ./package*.json ./apps/wb_backend/wb_serverless/wb_api_helloworld/
COPY ./../../../../../packages/kis_common/package*.json ./packages/kis_common/
COPY ./../../../../../package*.json ./

# Install dependencies for all workspaces
RUN npm i -w

# Copy all project files for both backend and shared-utils
COPY . ./apps/wb_backend/wb_serverless/wb_api_helloworld
COPY . ./packages/kis_common
# COPY ./../../../../../packages/kis_common ./packages/kis_common

# Build TypeScript code for the backend
RUN npm run build -w @kis/common
RUN npm run build -w @kis/wb-api-helloworld

# Stage 2: Runtime
FROM node:23-alpine

# Set working directory
WORKDIR /app

# Copy built files and dependencies
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
#
COPY --from=build /app/apps/wb_backend/wb_serverless/wb_api_helloworld/dist ./app/apps/wb_backend/wb_serverless/wb_api_helloworld/dist
COPY --from=build /app/apps/wb_backend/wb_serverless/wb_api_helloworld/node_modules ./app/apps/wb_backend/wb_serverless/wb_api_helloworld/node_modules
COPY --from=build /app/apps/wb_backend/wb_serverless/wb_api_helloworld/package*.json ./app/apps/wb_backend/wb_serverless/wb_api_helloworld/

# Expose the port serverless will run on
EXPOSE 3000

# Default command
CMD ["npx", "serverless", "offline", "--host", "0.0.0.0"]