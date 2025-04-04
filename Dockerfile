# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the server's .env file
COPY server/.env ./server/.env

# Install all dependencies, including dev dependencies like nodemon
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the necessary port
EXPOSE 5173

# Command to run the app
CMD ["npm", "run", "dev"]
