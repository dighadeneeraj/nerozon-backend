# syntax=docker/dockerfile:1

# 1) Dependencies for production (no dev deps)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# Install only production deps (used later in final image)
RUN npm ci --omit=dev && npm cache clean --force

# 2) Build & test stage (has dev deps so tests can run)
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Run Jest/Supertest (fail build if tests fail)
RUN npm test -- --ci

# 3) Runtime image (tiny, secure)
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app

# Copy prod node_modules and app source
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create non-root user
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

EXPOSE 3000

# Healthcheck hits /health (BusyBox has wget)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/health || exit 1

CMD ["npm","start"]
