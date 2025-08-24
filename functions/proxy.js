export async function handler(event) {
  const fileUrl = event.queryStringParameters.url;
  if (!fileUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  try {
    const res = await fetch(fileUrl);
    const buffer = Buffer.from(await res.arrayBuffer());

    return {
      statusCode: 200,
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
        "Content-Disposition": `attachment; filename="${fileUrl.split("/").pop()}"`,
        "Cache-Control": "no-cache",
      },
      body: buffer,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
}
