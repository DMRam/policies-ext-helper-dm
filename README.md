# Policies Helper DM

A complete OpenPages policy management tool with React frontend and Node.js backend.

## Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express API
- **Dockerized**: Ready for development and production

## Quick Start (Production)

1. **Copy the configuration file:**

   ```bash
   cp config.example.json config.json

2. **Edit the config.json with your credentials and query:**
{
  "openpages": {
    "baseUrl": "https://your-openpages-url",
    "username": "your-username",
    "password": "your-password"
  },
  "query": "SELECT * FROM [Policy]",
  "fields": [
    { "name": "Policy Name", "label": "Title", "visible": true },
    { "name": "OPSS-Pol:Approval Status", "label": "Status", "visible": true },
    { "name": "OPSS-Pol:Published Date", "label": "Published On", "visible": true }
  ],
  "theme": {
    "primaryColor": "#1e90ff",
    "fontFamily": "Roboto, sans-serif"
  }
}

3. **Start the application:**
docker compose -f docker-compose.prod.yml up
Access:
Frontend: http://localhost:5174
Backend: http://localhost:3001

## Development Mode

1. **Clone and set up the project:**
git clone https://github.com/dmram/policies-helper.git
cd policies-helper
cp config.example.json server/config.json

2. **Start the development environment:**
docker compose -f docker-compose.dev.yml up

## Docker Hub Deployment
1. **Pull and run the pre-built image:**
docker pull dmram/policies-helper:latest

2. **Run the Docker container:**
docker run -d \
  -p 5174:5173 \  # Maps container's Vite dev server (5173) to host port 5174
  -p 3001:3001 \
  -v /path/to/your/config.json:/app/config/config.json \  # Mount your config.json
  dmram/policies-helper:latest

## Configuration

Configuration File
Create and update the config.json file in the root directory of the project. This file includes your OpenPages credentials, query, and theme configuration.

config.json Example:
{
  "openpages": {
    "baseUrl": "https://your-openpages-url",
    "username": "your-username",
    "password": "your-password"
  },
  "query": "SELECT * FROM [Policy]",
  "fields": [
    { "name": "Policy Name", "label": "Title", "visible": true },
    { "name": "OPSS-Pol:Approval Status", "label": "Status", "visible": true },
    { "name": "OPSS-Pol:Published Date", "label": "Published On", "visible": true }
  ],
  "theme": {
    "primaryColor": "#1e90ff",
    "fontFamily": "Roboto, sans-serif"
  }
}
## Requirements

Docker & Docker Compose
Node.js (for development mode)