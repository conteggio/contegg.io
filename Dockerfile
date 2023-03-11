############################################
# 🔨 Build Image
############################################
FROM node:18.15.0-bullseye-slim as build
ENV DATABASE_URL "file:../data/prod.db"

# Install dumb-init
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy files (except package.json) and fetch dependencies
COPY prisma ./prisma/
COPY pnpm-lock.yaml ./
RUN pnpm fetch

# Copy remaining files
COPY package.json ./
COPY entrypoint.sh ./

# Create data directory
RUN mkdir -p ./data

# Install dependencies
RUN pnpm install -r --offline --frozen-lockfile

COPY . .

# Build app
RUN pnpm build

############################################
# ⭐ Production Image
############################################
FROM node:18.15.0-bullseye-slim
ENV DATABASE_URL "file:../data/prod.db"

# Copy dumb init
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy necessary files from builder
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/pnpm-lock.yaml /app/entrypoint.sh ./
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/data ./data

# Make entrypoint executable
RUN chmod +x ./entrypoint.sh

# Run app
EXPOSE 3000
VOLUME [ "./data" ]
ENTRYPOINT ["/usr/bin/dumb-init", "--", "./entrypoint.sh"]
CMD ["pnpm", "start:migrate:prod" ]