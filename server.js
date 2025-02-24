require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 5000;

const MARVEL_BASE_URL = process.env.MARVEL_BASE_URL;
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY; // Add your private key in .env

app.use(cors());

// Generate hash for API authentication
const generateHash = (ts) => {
  return crypto
    .createHash("md5")
    .update(ts + PRIVATE_KEY + PUBLIC_KEY)
    .digest("hex");
};

app.get("/characters", async (req, res) => {
  try {
    const ts = new Date().getTime().toString();
    const hash = generateHash(ts);

    const response = await axios.get(`${MARVEL_BASE_URL}/characters`, {
      params: {
        ts: ts,
        apikey: PUBLIC_KEY,
        hash: hash,
        limit: 10, // Number of characters
      },
    });

    console.log(response.data); // Log response
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Marvel data:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching Marvel data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
