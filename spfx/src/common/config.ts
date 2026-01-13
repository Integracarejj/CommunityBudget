
// src/common/config.ts
// Update API_BASE to your Function App hostname (no trailing slash).
// Example: https://cb-community-guidance-func.azurewebsites.net

export const API_BASE = "https://<YOUR_FUNCTION_APP>.azurewebsites.net";

// Optional: centralize routes & timeouts
export const ROUTES = {
    KB_GET: "/api/kb-get",
    FEEDBACK: "/api/feedback",
};

export const REQUEST = {
    timeoutMs: 10000,
};
