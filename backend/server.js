const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "DA PA Spam Score Checker API is running."
  });
});

app.get("/api/check", async (req, res) => {
  try {
    const websiteUrl = req.query.url;

    if (!websiteUrl) {
      return res.status(400).json({
        error: "Website URL is required."
      });
    }

    let parsedUrl;

    try {
      parsedUrl = new URL(websiteUrl);
    } catch {
      return res.status(400).json({
        error: "Invalid website URL."
      });
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return res.status(400).json({
        error: "Only HTTP and HTTPS URLs are allowed."
      });
    }

    /*
      IMPORTANT:
      This is where you connect your SEO API.

      The example below is a placeholder.
      It does NOT return real DA, PA, or Spam Score.

      Replace the placeholder API request with the
      official API request from your selected provider.
    */

    return res.status(501).json({
      error: "SEO API is not connected yet. Add your API provider credentials and request here."
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Internal server error."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
