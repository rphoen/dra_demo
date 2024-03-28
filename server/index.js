const express = require("express");
const next = require("next");
const axios = require("axios");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const databricksUrl = process.env.DATABRICKS_HOST;
const databricksToken = process.env.DATABRICKS_TOKEN;

app.prepare().then(() => {
  const server = express();

  // Your API routes go here
  server.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from the server!" });
  });

  server.use(express.json());
  // All other routes are handled by Next.js
  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
