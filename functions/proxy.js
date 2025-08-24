export async function handler(event) {
  const fileUrl = event.queryStringParameters.url;
  if (!fileUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  try {
    const res = await fetch(fileUrl);
    const arrayBuffer = await res.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    // Try to get original filename from server header
    let fileName = "firmware.bin";
    const contentDisp = res.headers.get("content-disposition");
    if (contentDisp) {
      const match = contentDisp.match(/filename="?([^"]+)"?/);
      if (match) fileName = match[1];
    } else {
      // fallback: extract from URL
      const urlParts = new URL(fileUrl);
      fileName = urlParts.pathname.split("/").pop() || "firmware.bin";
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-cache",
      },
      body: base64File,
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
