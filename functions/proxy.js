import fetch from "node-fetch";

export async function handler(event) {
  const fileUrl = event.queryStringParameters.url;
  if (!fileUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  try {
    const res = await fetch(fileUrl);
    const buffer = await res.arrayBuffer();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": "inline", // force browser to open
        "Cache-Control": "no-cache",
      },
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
