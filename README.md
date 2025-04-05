# 🛠️ Policies Helper DM

A complete OpenPages policy management tool with React frontend and Node.js backend.

## 🌟 Features

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express API
- **Dockerized**: Ready for development and production
- **Code Quality**: Type-safe ESLint configuration

## 🚀 Quick Start (Production)

```bash
# 1. Copy environment file
cp .env.example .env

# 2. Edit with your credentials (OPENPAGES_BASE_URL, USERNAME, PASSWORD)
nano .env

# 3. Start the application
docker compose -f docker-compose.prod.yml up
```

### Access:

- Frontend: [http://localhost:5174](http://localhost:5174)
- Backend: [http://localhost:3001](http://localhost:3001)

## 🧪 Development Mode

```bash
# 1. Clone and setup
git clone https://github.com/dmram/policies-helper.git
cd policies-helper
cp .env.example server/.env

# 2. Start development environment
docker compose -f docker-compose.dev.yml up
```

## 📦 Docker Hub Deployment

```bash
# Pull and run the pre-built image
docker pull dmram/policies-helper:latest

docker run -d \
  -p 5174:5173 \  # Maps container's Vite dev server (5173) to host port 5174
  -p 3001:3001 \
  --env-file .env \
  dmram/policies-helper:latest
```

## ⚙️ Configuration

### Environment Variables

| Variable             | Description                             |
| -------------------- | --------------------------------------- |
| `OPENPAGES_BASE_URL` | OpenPages base URL (without `/grc/api`) |
| `OPENPAGES_USERNAME` | Your OpenPages username                 |
| `OPENPAGES_PASSWORD` | Your OpenPages password                 |

## 🛠️ Technical Details

### ESLint Config (Flat Config - TypeScript)

```js
// eslint.config.js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

> 💡 Requires `@typescript-eslint` v6+ with flat config support.

### Vite Plugins

- `@vitejs/plugin-react` (Babel - default)
- `@vitejs/plugin-react-swc` (SWC - faster alternative)

## ✅ Requirements

- Docker & Docker Compose
- Node.js (for development mode)

## ✨ Credits 
**Danny Munoz**
