// Check for required environment variables
require("dotenv").config({ path: "./server/.env" });
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const NodeCache = require("node-cache");
const helmet = require("helmet"); // Added for security headers
const rateLimit = require("express-rate-limit"); // Added for rate limiting

// Initialize Express app
const app = express();
const port = process.env.PORT || 3001;

// Enhanced cache configuration
const policyCache = new NodeCache({
  stdTTL: 86400, // 24 hour cache
  checkperiod: 3600, // Check for expired items every hour
  useClones: false, // Better performance for large objects
});

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  })
);
app.use(express.json({ limit: "10kb" })); // Limit JSON payload size

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to all requests
app.use("/api/", limiter);

// HTTPS Agent configuration with better defaults
const agent = new https.Agent({
  rejectUnauthorized: process.env.NODE_ENV === "production", // Only allow self-signed in dev
  keepAlive: true,
  maxSockets: 50,
  timeout: 30000, // 30 seconds
});

// Enhanced API client with better defaults
const apiClient = axios.create({
  baseURL: `${process.env.OPENPAGES_BASE_URL}/grc/api`,
  auth: {
    username: process.env.OPENPAGES_USERNAME,
    password: process.env.OPENPAGES_PASSWORD,
  },
  httpsAgent: agent,
  timeout: 25000, // 25 second timeout
  maxContentLength: 50 * 1024 * 1024, // 50MB max response size
});

// Improved data transformation with error handling
const transformPolicyData = (data) => {
  try {
    if (!data?.rows) {
      throw new Error("Invalid OpenPages API response structure");
    }

    return data.rows.map((row) => {
      if (!row.fields?.field) return {};

      return row.fields.field.reduce((policy, field) => {
        // Handle different field types more robustly
        policy[field.name] =
          field.value ??
          field.enumValue?.name ??
          field.dateValue ??
          field.booleanValue ??
          null;
        return policy;
      }, {});
    });
  } catch (error) {
    console.error("Data transformation error:", error);
    throw new Error("Failed to transform policy data");
  }
};

// Enhanced policies endpoint with better error handling
app.get("/api/policies", async (req, res) => {
  const cacheKey = `policies-${req.query.q || "default"}`;
  console.log(`Cache key: ${cacheKey}`);
  console.log("Received request for policies");
  console.log("Query parameters:", req.query);
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body);

  console.log("OPENPAGES_BASE_URL:", process.env.OPENPAGES_BASE_URL);

  try {
    // Return cached data if available
    const cachedData = policyCache.get(cacheKey);
    if (cachedData) {
      console.log(`Returning cached data for key: ${cacheKey}`);
      return res.json(cachedData);
    }

    // Validate and sanitize query parameters
    const {
      q = "SELECT * FROM [Policy] WHERE [OPSS-Pol:Approval Status] = 'Approved'",
      skipCount = 0,
      pageSize = 50,
    } = req.query;

    if (isNaN(skipCount) || isNaN(pageSize)) {
      return res.status(400).json({ error: "Invalid pagination parameters" });
    }

    // Fetch from OpenPages API
    const response = await apiClient.get("/query", {
      params: {
        q: decodeURIComponent(q),
        skipCount: parseInt(skipCount),
        pageSize: Math.min(parseInt(pageSize), 100), // Enforce maximum page size
      },
    });

    const transformedData = transformPolicyData(response.data);

    // Cache the transformed data
    policyCache.set(cacheKey, transformedData);
    console.log(`Cached data for key: ${cacheKey}`);

    res.json(transformedData);
  } catch (error) {
    console.error("Policy fetch error:", error.message);

    // Try to return stale cache if available
    const staleData = policyCache.get(cacheKey);
    if (staleData) {
      console.warn("Returning stale cached data due to error");
      return res.json(staleData);
    }

    res.status(500).json({
      error: "Failed to fetch policies",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start server with proper error handling
const server = app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});

// Handle shutdown gracefully
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
