export async function handler(event) {
  const fileUrl = event.queryStringParameters.url;
  if (!fileUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  try {
    const res = await fetch(fileUrl);
    const arrayBuffer = await res.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileUrl.split("/").pop()}"`,
        "Cache-Control": "no-cache",
      },
      body: base64File,
      isBase64Encoded: true, // important!
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
