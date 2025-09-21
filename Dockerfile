# -------- BUILD STAGE --------
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM node:22-alpine AS production

WORKDIR /app

# Copy built Nuxt output and node_modules
COPY --from=build /app/.output ./.output
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 4000

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]
