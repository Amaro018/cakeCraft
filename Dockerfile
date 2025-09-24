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

# Copy Nuxt build output
COPY --from=build /app/.output ./.output



ENV PORT=4500
EXPOSE 4500

# Start Nuxt server
CMD ["node", ".output/server/index.mjs"]

