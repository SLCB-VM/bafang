export async function handler(event) {
  const fileUrl = event.queryStringParameters.url;
  if (!fileUrl) {
    return { statusCode: 400, body: "Missing url parameter" };
  }

  // Redirect the browser to the real firmware URL
  return {
    statusCode: 302,
    headers: {
      "Location": fileUrl,
      "Cache-Control": "no-cache",
    },
  };
}
