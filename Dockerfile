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

RUN mkdir -p /app/.output/public/uploads

ENV PORT=4500

EXPOSE 4500

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]
