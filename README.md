# 🛠️ Policies Helper DM

A web tool that fetches policy data from OpenPages via a custom API and displays it in a Vite-powered React frontend.

Includes:

- 🔧 Backend: Node.js + Express
- 🎨 Frontend: React + TypeScript + Vite
- ✨ ESLint with recommended rules for type-safe linting
- 🐳 Docker & Docker Compose support
- 🌐 Ready for local development and Docker Hub deployment

---
Copy .env.example to .env
cp .env.example .env 

run
docker compose -f docker-compose.prod.yml up

# Have Docker installed
# Login to docker
docker login
# Download the image
docker pull <username>/policy-helper:tagname
# copy env variables
cp .env.example .env

# replace
OPENPAGES_BASE_URL=https://your-openpages-url.com
OPENPAGES_USERNAME=your-username
OPENPAGES_PASSWORD=your-password



# Run the App Using Docker 
docker run -p 5174:5173 -p 3001:3001 --env-file .env <your-docker-username>/policy-helper:tagname


Frontend: http://localhost:5174
Backend: http://localhost:3001


## 🚀 Run Locally (Dev Mode)

### 1. Clone the Repository

git clone https://github.com/your-username/policies-helper.git
cd policies-helper


2. Copy and Edit the Environment Variables

cp .env.example server/.env
Update server/.env with your OpenPages credentials and base URL.

3. Start the Project with Docker Compose
docker compose -f docker-compose.dev.yml up
Frontend: http://localhost:5174
Backend: http://localhost:3001
📦 Run from Docker Hub (Production)

You can run the app using a prebuilt image from Docker Hub.

1. Create an .env File
cp .env.example .env
Fill it in with your real OpenPages credentials and URL.

2. Start with Docker Compose
docker compose -f docker-compose.prod.yml up
⚙️ Environment Variables

These must be set either in a .env file or directly in your Docker Compose:

Variable	Description
OPENPAGES_BASE_URL	Base URL of OpenPages (without /grc/api)
OPENPAGES_USERNAME	Your OpenPages username
OPENPAGES_PASSWORD	Your OpenPages password

This project uses Vite with React and TypeScript.

Two available plugins for React Fast Refresh:
@vitejs/plugin-react (default, uses Babel)
@vitejs/plugin-react-swc (optional, faster, uses SWC)
🔍 ESLint Configuration (Recommended)

To use type-aware linting with ESLint, use the following configuration:

// eslint.config.js
export default tseslint.config({
  extends: [
    // Use recommended type-checked rules
    ...tseslint.configs.recommendedTypeChecked,
    // Or go stricter
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add for style
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})

✅ Requirements
Docker & Docker Compose installed
Docker Hub account (optional for sharing images)


// eslint.config.js
export default tseslint.config({
  extends: [
    // Use recommended type-checked rules
    ...tseslint.configs.recommendedTypeChecked,
    // Or go stricter
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add for style
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})


✨ Credits
Built by Danny Munoz