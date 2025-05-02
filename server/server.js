require("dotenv").config({ path: ".env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const NodeCache = require("node-cache");
const fs = require("fs");
const path = require("path");

// Load config
const configPath = path.join(__dirname, "config.json");
let appConfig;

try {
  appConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
  console.log("Loaded config:", appConfig);
} catch (err) {
  console.error("Failed to load config.json:", err.message);
  process.exit(1);
}

const baseUrl = appConfig.openpages.baseUrl;
const username = appConfig.openpages.username;
const password = appConfig.openpages.password;

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Basic cache configuration
const policyCache = new NodeCache({ stdTTL: 86400 }); // 24 hours

// ========== MIDDLEWARE ========== //
app.use(cors());
app.use(express.json());

// ========== HTTPS AGENT ========== //
const agent = new https.Agent({
  rejectUnauthorized: false,
  keepAlive: true,
  maxSockets: 50,
  timeout: 30000,
});

// ========== AXIOS CLIENT ========== //
const apiClient = axios.create({
  baseURL: `${baseUrl || process.env.OPENPAGES_BASE_URL}/grc/api`,
  auth: {
    username: username || process.env.OPENPAGES_USERNAME,
    password: password || process.env.OPENPAGES_PASSWORD,
  },
  httpsAgent: agent,
});

// ========== LOG OPENPAGES CONFIG ========== //
console.log("Using OpenPages API URL:", process.env.OPENPAGES_BASE_URL);
console.log("Username =====> :", process.env.OPENPAGES_USERNAME);
console.log("Password =====>:", process.env.OPENPAGES_PASSWORD);
console.log("Base URL =====>:", process.env.OPENPAGES_BASE_URL);

// ========== UTIL: TRANSFORM API RESPONSE ========== //
const transformPolicyData = (data) => {
  if (!data?.rows) return [];
  return data.rows.map((row) => {
    const policy = {};
    row.fields?.field?.forEach((field) => {
      policy[field.name] =
        field.value ?? field.enumValue?.name ?? field.dateValue ?? null;
    });
    return policy;
  });
};

// ========== API ROUTES ========== //

// Get Policies (JSON)
app.get("/api/policies", async (req, res) => {
  const cacheKey = `policies-${req.query.q || "default"}`;

  console.log(
    "Query being sent to OpenPages API:",
    req.query.q || appConfig.query || "SELECT * FROM [Policy]"
  );

  try {
    const cachedData = policyCache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

    const response = await apiClient.get("/query", {
      params: {
        q: req.query.q || appConfig.query || "SELECT * FROM [Policy]",
        skipCount: parseInt(req.query.skipCount) || 0,
        pageSize: Math.min(parseInt(req.query.pageSize), 100) || 50,
      },
    });

    const transformedData = transformPolicyData(response.data);
    policyCache.set(cacheKey, transformedData);
    res.json(transformedData);
  } catch (error) {
    console.error("Policy fetch error:", error.message);
    res.status(500).json({ error: "Failed to fetch policies" });
  }
});

// Health Check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ========== STATIC FILES ========== //
const staticDir = path.join(__dirname, "../dist");
app.use(express.static(staticDir));

// Client-side routing fallback
app.get("*", (req, res) => {
  res.sendFile(path.join(staticDir, "index.html"));
});

// ========== ERROR HANDLER ========== //
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// ========== START SERVER ========== //
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`OpenPages API: ${process.env.OPENPAGES_BASE_URL}`);
  console.log(`Serving static files from: ${staticDir}`);
});
