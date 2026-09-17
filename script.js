/*
  Replace this URL with your deployed backend URL.

  Example:
  https://your-seo-checker-backend.onrender.com
*/

const API_BASE_URL = "https://YOUR-BACKEND-URL.onrender.com";

async function checkWebsite() {
  const websiteInput = document.getElementById("website");
  const website = websiteInput.value.trim();

  const button = document.getElementById("checkButton");
  const loading = document.getElementById("loading");
  const results = document.getElementById("results");
  const message = document.getElementById("message");
  const websiteResult = document.getElementById("websiteResult");

  message.className = "message";
  message.textContent = "";
  results.style.display = "none";
  websiteResult.style.display = "none";

  if (!website) {
    showError("Please enter a website URL.");
    return;
  }

  let validUrl;

  try {
    validUrl = new URL(website);

    if (!["http:", "https:"].includes(validUrl.protocol)) {
      throw new Error("Invalid protocol");
    }
  } catch {
    showError("Please enter a valid URL, such as https://example.com");
    return;
  }

  button.disabled = true;
  loading.style.display = "flex";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/check?url=${encodeURIComponent(validUrl.href)}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to fetch website metrics.");
    }

    document.getElementById("daScore").textContent =
      data.da ?? "--";

    document.getElementById("paScore").textContent =
      data.pa ?? "--";

    document.getElementById("spamScore").textContent =
      data.spamScore !== null && data.spamScore !== undefined
        ? `${data.spamScore}%`
        : "--";

    websiteResult.textContent = `Results for ${validUrl.href}`;
    websiteResult.style.display = "block";

    results.style.display = "grid";

    message.className = "message success";
    message.textContent = "Website metrics retrieved successfully.";

  } catch (error) {
    showError(error.message || "Something went wrong.");
  } finally {
    button.disabled = false;
    loading.style.display = "none";
  }
}

function showError(text) {
  const message = document.getElementById("message");
  message.className = "message error";
  message.textContent = text;
}

document.getElementById("website").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    checkWebsite();
  }
});
