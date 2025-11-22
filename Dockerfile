# Multi-stage Dockerfile for OKR Sherpa React + Vite application

# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Build the application
RUN npm run build

# Stage 3: Production runner with Nginx
FROM nginx:alpine AS runner
WORKDIR /app

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a simple health check endpoint
RUN echo '{"status":"healthy","service":"okr-sherpa"}' > /usr/share/nginx/html/health.json

# Expose port (will be configured in docker-compose)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health.json || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
