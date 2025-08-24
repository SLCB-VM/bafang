// functions/firmware.js
import fetch from "node-fetch";

export async function handler() {
  try {
    // Use a CORS-friendly HTTPS proxy for the HTTP API
   const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent("http://eu-central-1.api.besst.bafang-service.com/client/1/sys/firmware/filter?page=0&pageSize=1000&token=a02d491af1d8ab9bd4bcfebecc376d6c");
  const response = await fetch(proxyUrl, { method: "GET" });

    const response = await fetch(proxyUrl, { method: "GET" });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} — ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Error fetching firmware:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch firmware", detail: err.toString() })
    };
  }
}

