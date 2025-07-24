# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate

# Copy only package files first for better cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm run build

# Stage 2: Production image
FROM nginx:1.25-alpine AS production

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional, fallback to default if not present)
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# Stage 3: Test (optional)
FROM node:20-alpine AS test
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@8.15.5 --activate
RUN pnpm install --frozen-lockfile
COPY . .
CMD ["pnpm", "run", "test:unit"] 