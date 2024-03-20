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

  server.get("/api/databricks", async (req, res) => {
    try {
      const databricksResponse = await axios.get(
        `${databricksUrl}/api/2.1/unity-catalog/catalogs`,
        {
          headers: {
            Authorization: `Bearer ${databricksToken}`,
          },
          params: req.query,
        }
      );
      res.status(200).json(databricksResponse.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching data from Databricks" });
    }
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
