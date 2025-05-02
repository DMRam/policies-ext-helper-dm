# Build stage for frontend (Vite)
FROM node:20 AS build-stage
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files for the frontend build
COPY . .

# Build the frontend
RUN npm run build

# Production stage for the backend
FROM node:20
WORKDIR /app

# Copy built frontend into the production image
COPY --from=build-stage /app/dist ./dist

# Copy server files
COPY server ./server
COPY package*.json ./
RUN npm install --production

# Expose port 5000
EXPOSE 5000

# Command to start the server in production mode
CMD ["npm", "run", "serve"]
