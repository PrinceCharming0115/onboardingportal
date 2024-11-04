# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN yarn build

# Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY --from=build /app/package.json /app/yarn.lock ./

# Copy built assets
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]